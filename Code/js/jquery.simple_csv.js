/*!
 * jQuery SimpleCsv Plugin v1.0.0
 * https://github.com/criticalbreak5/simple_csv
 *
 * Copyright 2014 criticalbreak5's
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 2014-07-14T00:00Z
 */
(
	function($) {
		$.simple_csv = function(text_data) {

			var records = new Array();
			var record = new Array();
			var column = new Array();

			var cr_flg = false;
			var quot_flg = false;

			for (i = 0; i < text_data.length; i++) {
				var ch = text_data.charAt(i);
				if (ch == '\r') {
					cr_flg = true;
				} else {
					if (ch == '\n') {
						if (quot_flg) {
							if (cr_flg) {
								column.push('\r');
							}
							column.push('\n');
						} else {
							record.push(column.join(''));
							column = new Array();
							records.push(record);
							record = new Array();
						}
					} else if (ch == ',') {
						if (quot_flg) {
							column.push(',');
						} else {
							record.push(column.join(''));
							column = new Array();
						}
					} else if (ch == '"') {
						if (quot_flg) {
							if ((i + 1) < text_data.length && text_data.charAt((i + 1)) == '"') {
								i++;
								column.push('"');
							} else {
								quot_flg = false;
							}
						} else {
							quot_flg = true;
						}
					} else {
						column.push(ch);
					}
					cr_flg = false;
				}
			}

			if (record.length != 0) {
				record.push(column.join(''));
				records.push(record);
			}

			return records;

		};
})(jQuery);