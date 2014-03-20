import os
import json

def watch_dir(path):
	files = []
	for dirname, dirnames, filenames in os.walk(path):
		# print path to all subdirectories first.
		for subdirname in dirnames:
			print os.path.join(dirname)

		# print path to all filenames.
		for filename in filenames:
			file_found = os.path.join(dirname, filename)[len(path)+1:]
			files.append(file_found)

		if '.git' in dirnames:
			# don't go into any .git directories.
			dirnames.remove('.git')

	return files

def watch_plugin(path):
	watched_dirs = ["controllers", "models", "templates", "views"]

	plugin_files = {}

	for item in watched_dirs:
		files_found = watch_dir("%s/%s" % (path,item) )
		if files_found != []:
			plugin_files[item] = files_found

	return plugin_files

f1=open('./lib/seeds/generated/available_files.gen.json', 'w+')
f1.write(json.dumps(watch_plugin("app"), indent=4, sort_keys=True))
