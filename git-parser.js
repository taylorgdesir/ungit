		file.removed = status[1] == 'D';
      	lines.shift(); lines.shift();
		var originalLine, newLine;
			var line = lines.shift();
			if (line.indexOf('@@ ') == 0) {
				var changeGroup = /@@ -(\d+),\d+ [+](\d+),\d+/.exec(line);
				originalLine = changeGroup[1];
				newLine = changeGroup[2];
				diff_lines.push([null, null, line]);
			} else {
				if (line[0] == '+') {
					diff_lines.push([null, newLine++, line]);
				} else if (line[0] == '-') {
					diff_lines.push([originalLine++, null, line]);
				} else {
					diff_lines.push([originalLine++, newLine++, line]);
				}
			}
		} else if (row.indexOf('Commit: ') == 0) {
			var author = row.split(' ').slice(1).join(' ');
			var capture = (/([^<]+)<([^>]+)>/g).exec(author);
			currentCommmit.committerName = capture[1].trim();
			currentCommmit.committerEmail = capture[2].trim();
		} else if (row.indexOf('AuthorDate: ') == 0) {
			currentCommmit.authorDate = row.slice('AuthorDate: '.length).trim();
		} else if (row.indexOf('CommitDate: ') == 0) {
			currentCommmit.commitDate = row.slice('CommitDate: '.length).trim();
}

exports.parseGitRemotes = function(text) {
	return text.split('\n').filter(function(remote) {
		return remote != '';
	});
}