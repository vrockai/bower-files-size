'use strict';

require('console.table');

function bowerFilesSize() {
    const _ = require('lodash');
    const fs = require('fs');
    const lib = require('bower-files')();
    const prettyBytes = require('pretty-bytes');

    const bowerDependencies = _(lib.component.dependencies)
        .map(expandFiles)
        .map(expandFileSize)
        .value();

    const totalBowerFilesSize = _.reduce(bowerDependencies, integrateSize, 0);

    var outputTable = _(bowerDependencies)
        .map(shrinkView)
        .sortBy('totalSize')
        .reverse()
        .map(prettify)
        .value();

    console.table(outputTable);
    console.log('Total size: ', prettyBytes(totalBowerFilesSize));

    ////////////

    function shrinkView(dependency) {
        return {
            name: dependency.name,
            version: dependency.version,
            totalSize: dependency.totalSize
        }
    }

    function integrateSize(sum, dependency) {
        sum += dependency.totalSize;
        return sum;
    }

    function prettify(dependency) {
        dependency.totalSize = prettyBytes(dependency.totalSize);
        return dependency;
    }

    function expandFiles(dependency) {
        return {
            name: dependency.json.name,
            version: dependency.json.version,
            files: dependency.files()
        }
    }

    function expandFileSize(dependency) {
        var totalSize = 0;
        dependency.fileSizes = _.reduce(dependency.files, getFilesSizes, {});
        dependency.totalSize = totalSize;

        return dependency;

        ////////////

        function getFilesSizes(sum, file) {
            sum[file] = getFilesizeInBytes(file);
            totalSize += sum[file];
            return sum;
        }
    }

    function getFilesizeInBytes(filename) {
        const stats = fs.statSync(filename);
        const fileSizeInBytes = stats.size;

        return fileSizeInBytes;
    }
}

bowerFilesSize();
module.exports = bowerFilesSize;