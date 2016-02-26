var fs = require("fs");
var through = require("through2");
var gulputil = require("gulp-util");
var PluginError = gulputil.PluginError;

const PLUGIN_NAME = "gulp-razormin";

function gulpRazorMin (options) {
	var stream = through.obj(function (file, enc, callback) {
		if (file.isStream()) {
			this.emit("error", new PluginError(PLUGIN_NAME, "Streams are not supported!"));
			return callback();
		}
		
		var fileContents = "",
            usingsAndModelRegex = /\r?\n?@(using|model).+\r?\n/g;
		
		try {
            fileContents = String(file.contents);
            
            var usingsAndModel = fileContents.match(usingsAndModelRegex).join(""),
                fileContentsWithoutUsingsAndModel = fileContents.replace(usingsAndModelRegex, "");
            
			fileContents = usingsAndModel + fileContentsWithoutUsingsAndModel.replace(/\r?\n\s*/g, "");
			file.contents = new Buffer(fileContents);
			this.push(file);
		}
		catch (e) {
			console.warn("Error: " + e.message + " in " + file.path);
			this.push(file);
			return callback();
		}
		
		callback();
	});

	return stream;
}

module.exports = gulpRazorMin;