/*
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

'use strict';

var mdastToString = require('mdast-util-to-string');
var _ = require('lodash');

var returnData;
var metadataNodes = [];

function extract(ast, file, next) {
	for (var index in ast.children) {
		var node = ast.children[index];

		if (index > 0) {
			if (node.type !== 'heading') {
				metadataNodes.push(node);
			} else {
				break;
			}
		}
	}

	metadataNodes.forEach(function(node) {
		var arr = mdastToString(node)
		          .split('\n')
		          .join(' ')
		          .split('"');

		returnData.title = arr[1];

		var time = arr[3].split(' ');
		returnData.time = returnData.time || {};
		returnData.time.epoch = time[0];
		// TODO: should this be further parsed?
		returnData.time.utcoffset = time[time.length-1];

		returnData.author = arr[5];

		returnData.categories = arr[7].split(',').map(_.trim);
		debugger;
	});

	next();
};

module.exports = function(remark, options, returnDataSet) {
	returnData = options.data;
	return extract;
};
