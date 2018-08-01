"use strict";
const express = require('express');
const exec = require('child_process').exec;
const stringFormat = require('string-format');
const _ = require('underscore');
const models = require('../../../db/models/index');
const VideoFormat = models.VideoFormat;
stringFormat.extend(String.prototype, {});

const router = express.Router();

router.use((req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	next();
});

router.get("/list_urls/:videoid", async (req, res, next) => {
	const videoId = req.params.videoid;
	const command = "/usr/local/bin/youtube-dl {} {} {}".format("-g", "--all-format", videoId);
	let videoFormat = await VideoFormat.findOne({where: {videoId: videoId}});
	let currentTime = new Date().getTime();  // millis
	let offsetTime = 6 * 60 * 60 * 1000;  // 5.5 hours in millis

	if (videoFormat == null || currentTime > (videoFormat.updatedAt.getTime() + offsetTime) ){
		if (videoFormat != null)
			await videoFormat.destroy();

		exec(command, async (err, stdout, stderr)=>{
			if (err){
				console.log(err);
				res.json({error:{message:'Error {}'.format(err)}})
			}else if (stdout != null && stdout.length > 0){
				let formats = stdout.split("\n");
				formats = _.filter(formats, (f) => { return f!=null && f.trim().length > 0});
				let videoFormat = new VideoFormat({videoId: videoId, formats: JSON.stringify(formats)});
				await videoFormat.save();
				let expiresIn = offsetTime;
				res.json({data:{expiresIn: expiresIn, formats: formats}});
			}
		})
	}else {
		let expiresIn = Number((videoFormat.updatedAt.getTime() + offsetTime - currentTime)/1000).toFixed(0);
		res.json({data:{expiresIn: expiresIn, formats: JSON.parse(videoFormat.formats)}});
	}

});

module.exports = router;