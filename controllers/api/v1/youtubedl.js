"use strict";
const express = require('express');
const exec = require('child_process').exec;
const stringFormat = require('string-format');

stringFormat.extend(String.prototype, {});

const router = express.Router();

router.use((req, res, next) =>{
	res.setHeader('Content-Type', 'application/json');
	next();
});

router.get("/list_urls/:videoid", (req, res, next) => {
	const videoId = req.params.videoid;
	const command = "/usr/local/bin/youtube-dl {} {} {}".format("-g", "--all-format", videoId);
	exec(command, (err, stdout, stderr) => {
		if (err)
			console.log(err);
		if (stdout)
			console.log(stdout);
		if (stderr)
			console.log(stderr);
	});

});

module.exports = router ;