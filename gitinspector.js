var PythonShell = require('python-shell');

function run(parameters, serverResponse) {
    var options = {
        scriptPath: '/Users/julien/Documents/gitinspector',
        args : [
            '/Users/julien/Documents/sc-api/',
            '--format=json'
        ]
    };

    appendAuthorFilter(options, parameters);
    appendAllowedFileTypes(options, parameters);
    appendPathFilter(options, parameters);

    PythonShell.run('gitinspector.py', options, function (err, result) {
        if (err) {
            throw err;
        }
        result = JSON.parse(result.join(''));

        serverResponse.send(result);
    });
}

function appendAuthorFilter(options, parameters) {
    parameters.filteredAuthors.forEach(function(author) {
        options.args.push('--exclude=author:' + author);
    });
}

function appendPathFilter(options, parameters) {
    parameters.filteredPaths.forEach(function(path) {
        options.args.push('--exclude=file:' + path);
    });
}

function appendAllowedFileTypes(options, parameters) {
    if (!parameters.fileTypes) {
        return;
    }

    options.args.push('--file-types=' + parameters.fileTypes.join(','));
}

exports.run = run;