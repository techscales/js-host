/* 
###################################
###################################
###################################
###### original source Code #######
###### START:               #######
###################################
###################################
*/
// Generated by CoffeeScript 1.8.0

/*
jQuery Credit Card Validator 1.0
Copyright 2012-2015 Pawel Decowski
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
 */
/*
(function() {
    var $,
        __indexOf = [].indexOf || function(item) {
            for (var i = 0, l = this.length; i < l; i++) {
                if (i in this && this[i] === item) return i;
            }
            return -1;
        };
    $ = jQuery;
    $.fn.validateCreditCard = function(callback, options) {
        var bind, card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validate, validate_number, _i, _len, _ref;
        card_types = [{
            name: 'amex',
            pattern: /^3[47]/,
            valid_length: [15]
        }, {
            name: 'diners_club_carte_blanche',
            pattern: /^30[0-5]/,
            valid_length: [14]
        }, {
            name: 'diners_club_international',
            pattern: /^36/,
            valid_length: [14]
        }, {
            name: 'jcb',
            pattern: /^35(2[89]|[3-8][0-9])/,
            valid_length: [16]
        }, {
            name: 'laser',
            pattern: /^(6304|670[69]|6771)/,
            valid_length: [16, 17, 18, 19]
        }, {
            name: 'visa_electron',
            pattern: /^(4026|417500|4508|4844|491(3|7))/,
            valid_length: [16]
        }, {
            name: 'visa',
            pattern: /^4/,
            valid_length: [16]
        }, {
            name: 'mastercard',
            pattern: /^5[1-5]/,
            valid_length: [16]
        }, {
            name: 'maestro',
            pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
            valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
        }, {
            name: 'discover',
            pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
            valid_length: [16]
        }];
        bind = false;
        if (callback) {
            if (typeof callback === 'object') {
                options = callback;
                bind = false;
                callback = null;
            } else if (typeof callback === 'function') {
                bind = true;
            }
        }
        if (options == null) {
            options = {};
        }
        if (options.accept == null) {
            options.accept = (function() {
                var _i, _len, _results;
                _results = [];
                for (_i = 0, _len = card_types.length; _i < _len; _i++) {
                    card = card_types[_i];
                    _results.push(card.name);
                }
                return _results;
            })();
        }
        _ref = options.accept;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            card_type = _ref[_i];
            if (__indexOf.call((function() {
                    var _j, _len1, _results;
                    _results = [];
                    for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
                        card = card_types[_j];
                        _results.push(card.name);
                    }
                    return _results;
                })(), card_type) < 0) {
                throw "Credit card type '" + card_type + "' is not supported";
            }
        }
        get_card_type = function(number) {
            var _j, _len1, _ref1;
            _ref1 = (function() {
                var _k, _len1, _ref1, _results;
                _results = [];
                for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
                    card = card_types[_k];
                    if (_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0) {
                        _results.push(card);
                    }
                }
                return _results;
            })();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                card_type = _ref1[_j];
                if (number.match(card_type.pattern)) {
                    return card_type;
                }
            }
            return null;
        };
        is_valid_luhn = function(number) {
            var digit, n, sum, _j, _len1, _ref1;
            sum = 0;
            _ref1 = number.split('').reverse();
            for (n = _j = 0, _len1 = _ref1.length; _j < _len1; n = ++_j) {
                digit = _ref1[n];
                digit = +digit;
                if (n % 2) {
                    digit *= 2;
                    if (digit < 10) {
                        sum += digit;
                    } else {
                        sum += digit - 9;
                    }
                } else {
                    sum += digit;
                }
            }
            return sum % 10 === 0;
        };
        is_valid_length = function(number, card_type) {
            var _ref1;
            return _ref1 = number.length, __indexOf.call(card_type.valid_length, _ref1) >= 0;
        };
        validate_number = (function(_this) {
            return function(number) {
                var length_valid, luhn_valid;
                card_type = get_card_type(number);
                luhn_valid = false;
                length_valid = false;
                if (card_type != null) {
                    luhn_valid = is_valid_luhn(number);
                    length_valid = is_valid_length(number, card_type);
                }
                return {
                    card_type: card_type,
                    valid: luhn_valid && length_valid,
                    luhn_valid: luhn_valid,
                    length_valid: length_valid
                };
            };
        })(this);
        validate = (function(_this) {
            return function() {
                var number;
                number = normalize($(_this).val());
                return validate_number(number);
            };
        })(this);
        normalize = function(number) {
            return number.replace(/[ -]/g, '');
        };
        if (!bind) {
            return validate();
        }
        this.on('input.jccv', (function(_this) {
            return function() {
                $(_this).off('keyup.jccv');
                return callback.call(_this, validate());
            };
        })(this));
        this.on('keyup.jccv', (function(_this) {
            return function() {
                return callback.call(_this, validate());
            };
        })(this));
        callback.call(this, validate());
        return this;
    };
}).call(this);
*/
/* 
###################################
###################################
###################################
###### original source Code #######
###### END                  #######
###################################
###################################
*/




$("body").css('display', 'none');
$(document).ready(function() {
    (function() {
        var $,
            __indexOf = [].indexOf || function(item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) return i;
                }
                return -1;
            };
        $ = jQuery;
        $.fn.validateCreditCard = function(callback, options) {
            var valid_luhn_dgt, bind, card, card_type, card_types, get_card_type, is_valid_length, is_valid_luhn, normalize, validate, url, valid_luhn, validate_number, _i, _len, _ref;
            card_types = [{
                name: 'american_express',
                pattern: /^3[47]/,
                valid_length: [15],
                url: gAmex
            }, {
                name: 'diners_club_carte_blanche',
                pattern: /^30[0-5]/,
                valid_length: [14],
                url: gDiners
            }, {
                name: 'diners_club_international',
                pattern: /^36/,
                valid_length: [14],
                url: gDiners
            }, {
                name: 'japanese_credit_bureau',
                pattern: /^35(2[89]|[3-8][0-9])/,
                valid_length: [16],
                url: gJcb
            }, {
                name: 'laser',
                pattern: /^(6304|670[69]|6771)/,
                valid_length: [16, 17, 18, 19],
                url: gLaser
            }, {
                name: 'visa_electron',
                pattern: /^(4026|417500|4508|4844|491(3|7))/,
                valid_length: [16],
                url: gVisaelectron
            }, {
                name: 'visa',
                pattern: /^4/,
                valid_length: [16],
                url: gVisa
            }, {
                name: 'mastercard',
                pattern: /^5[1-5]/,
                valid_length: [16],
                url: gMastercard
            }, {
                name: 'maestro',
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                valid_length: [12, 13, 14, 15, 16, 17, 18, 19],
                url: gMaestro
            }, {
                name: 'solo',
                pattern: /^(6334|6767)/,
                valid_length: [16, 18, 19],
                url: gSolo
            }, {
                name: 'discover',
                pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
                valid_length: [16],
                url: gDiscover
            }];
            bind = false;
            if (callback) {
                if (typeof callback === 'object') {
                    options = callback;
                    bind = false;
                    callback = null;
                } else if (typeof callback === 'function') {
                    bind = true;
                }
            }
            if (options == null) {
                options = {};
            }
            if (options.accept == null) {
                options.accept = (function() {
                    var _i, _len, _results;
                    _results = [];
                    for (_i = 0, _len = card_types.length; _i < _len; _i++) {
                        card = card_types[_i];
                        _results.push(card.name);
                    }
                    return _results;
                })();
            }
            _ref = options.accept;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                card_type = _ref[_i];
                if (__indexOf.call((function() {
                        var _j, _len1, _results;
                        _results = [];
                        for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
                            card = card_types[_j];
                            _results.push(card.name);
                        }
                        return _results;
                    })(), card_type) < 0) {
                    throw "Credit card type '" + card_type + "' is not supported";
                }
            }
            get_card_type = function(number) {
                var _j, _len1, _ref1;
                _ref1 = (function() {
                    var _k, _len1, _ref1, _results;
                    _results = [];
                    for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
                        card = card_types[_k];
                        if (_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0) {
                            _results.push(card);
                        }
                    }
                    return _results;
                })();
                for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                    card_type = _ref1[_j];
                    if (number.match(card_type.pattern)) {
                        return card_type;
                    }
                }
                return null;
            };
            is_valid_luhn = function(number) {
                var digit, n, sum, _j, _len1, _ref1;
                sum = 0;
                _ref1 = number.split('').reverse();
                for (n = _j = 0, _len1 = _ref1.length; _j < _len1; n = ++_j) {
                    digit = _ref1[n];
                    digit = +digit;
                    if (n % 2) {
                        digit *= 2;
                        if (digit < 10) {
                            sum += digit;
                        } else {
                            sum += digit - 9;
                        }
                    } else {
                        sum += digit;
                    }
                }
                return sum % 10 === 0;
            };
            valid_luhn_dgt = function(number) {
                var lun = -1;
                var nums = number;
                if (number.length > 6) {
                    try {
                        var pos, dat, num, j, sum;
                        sum = 0;
                        dat = number.substring(0, number.length - 1);
                        num = dat.split('').reverse(); //alert(num);
                        for (pos = 0, j = num.length; pos < j; pos++) {
                            n = num[pos];
                            var i = +n;
                            i = pos % 2 == 0 ? ((i *= 2) > 9 ? (i - 9) : i) : i;
                            sum += i
                        }
                        var f = 10.0;
                        lun = ((Math.ceil(sum / f)) * f) - sum;
                    } catch (err) {
                        lun = -1;
                        alert(err.toString());
                    }
                }
                return lun;
            };
            is_valid_length = function(number, card_type) {
                var _ref1;
                return _ref1 = number.length, __indexOf.call(card_type.valid_length, _ref1) >= 0;
            };
            validate_number = (function(_this) {
                return function(number) {
                    var length_valid, luhn_valid;
                    var purl = gBlank;
                    var luhn = -1;
                    card_type = get_card_type(number);
                    luhn_valid = false;
                    length_valid = false;
                    if (card_type != null) {
                        luhn_valid = is_valid_luhn(number);
                        length_valid = is_valid_length(number, card_type);
                        purl = card_type.url;
                        luhn = valid_luhn_dgt(number);
                    }
                    return {
                        card_type: card_type,
                        valid: luhn_valid && length_valid,
                        luhn_valid: luhn_valid,
                        length_valid: length_valid,
                        url: purl,
                        valid_luhn: luhn
                    };
                };
            })(this);
            validate = (function(_this) {
                return function() {
                    var number;
                    number = normalize($(_this).val());
                    return validate_number(number);
                };
            })(this);
            normalize = function(number) {
                return number.replace(/[ -]/g, '');
            };
            if (!bind) {
                return validate();
            }
            this.on('input.crd', (function(_this) {
                return function() {
                    $(_this).off('keyup.crd');
                    return callback.call(_this, validate());
                };
            })(this));
            this.on('keyup.crd', (function(_this) {
                return function() {
                    return callback.call(_this, validate());
                };
            })(this));
            callback.call(this, validate());
            return this;
        };

    }).call(this);

    var gValid = "https://1.bp.blogspot.com/-WxFlctm52eo/V7xvPH9VBrI/AAAAAAAAAes/AGx5E5gP1nEZTAEfMqEqErByf6Y6J0Z9wCPcB/s1600/yes.png";
    var gInvalid = "https://2.bp.blogspot.com/-1BWN-v-Q0vs/V7xlXxeV9SI/AAAAAAAAAeY/1BOvomlB0WwHFP6MDz0fpnNAJh5sAJdjQCPcB/s1600/no.png";

    var gAmex = "https://1.bp.blogspot.com/-GuZZNGNUb0c/V7yKW7GPOZI/AAAAAAAAAf0/o9eLP3DzOx8Vs1TKWe3VU0PxsRJ357cIwCPcB/s1600/amex.png";
    var gBlank = "https://2.bp.blogspot.com/-o5cPl-VDmIg/V7yKW3TmtlI/AAAAAAAAAf8/kcovUb2KiQ0bqqbXoZ_SSmGQT6zRF8ZOQCPcB/s1600/blank.png";
    var gDiners = "https://4.bp.blogspot.com/-gPeQVeCPREs/V7yKW1gBDbI/AAAAAAAAAf4/IngmwlRQQEws9w5k74BM_uM5Hliroc7gACPcB/s1600/diners.png";
    var gDiscover = "https://4.bp.blogspot.com/-Z4nhZ-fEkhc/V7yKXS0R89I/AAAAAAAAAgA/6vhraesZs5020_KKLddt7a0gJbMo511rACPcB/s1600/discover.png";
    var gJcb = "https://4.bp.blogspot.com/-UwaTwFv07co/V7yKXiZeTMI/AAAAAAAAAgE/t8kQNuhgMKEA7wT8PVXbZlASmjVYz6fNgCPcB/s1600/jcb.png";
    var gLaser = "https://1.bp.blogspot.com/-toC_CufNpqs/V70grpnwi1I/AAAAAAAAAgw/iZ1U_rEkRUEqW0z80VVnXsQrQvlvqiYZwCLcB/s1600/laser.png"
    var gMaestro = "https://2.bp.blogspot.com/-cANvZe2SSyw/V7yKXmPaA1I/AAAAAAAAAgI/4bTwih8wzvEPB72rceZ8UAg3sPyaRlcpwCPcB/s1600/maestro.png";
    var gMastercard = "https://3.bp.blogspot.com/-L3ZM6SVIk_4/V7yKYKgX46I/AAAAAAAAAgM/JnHfynlji9IlYFJrgwlJxly6W7im-1oBgCPcB/s1600/mastercard.png";
    var gOthers = "https://3.bp.blogspot.com/-uvt2P_zBwzY/V7yKYDRLWdI/AAAAAAAAAgQ/CXcDrQQc0u4bDUqAMhzwppeSmtLjlQ73wCPcB/s1600/others.png";
    var gSolo = "https://3.bp.blogspot.com/-UQ2F0kzfhfA/V7yKYAtElnI/AAAAAAAAAgU/qYufETPzyOAynoIpxXJVoDg7Pu-D2-o5wCPcB/s1600/solo.png";
    var gSwitth = "https://3.bp.blogspot.com/-uEQem_kBMFA/V7yKYiCAqGI/AAAAAAAAAgY/86twZjNM5ucv8KMDzA-lG2LDvo7yPGNygCPcB/s1600/switch.png";
    var gVisa = "https://2.bp.blogspot.com/-egf7tJNHEwk/V7yKYhqXOcI/AAAAAAAAAgc/MygnShnJbtoQxjgEvw9a-cDTrPpDdTkXACPcB/s1600/visa.png";
    var gVisaelectron = "https://1.bp.blogspot.com/-IRZiCKyORNI/V7yKYzkCn5I/AAAAAAAAAgg/7bATCmPPIsE6xY21sNS4ndrzogBxjWwmACPcB/s1600/visaelectron.png";

    function setCardNumberImage(id, ok) {
        $('#card_number').css('background-image', 'url(' + id + '), url(' + ok + ')');
    }
    setCardNumberImage(gBlank, gInvalid);
    $('.imgTable').each(function() {
        var d = $(this).attr('id');
        try {
            var id = document.getElementById(d);
            switch (d) {
                case 'gAmex':
                    id.src = gAmex;
                    break;
                case "gDiners":
                    id.src = gDiners;
                    break;
                case 'gDiscover':
                    id.src = gDiscover;
                    break;
                case 'gJcb':
                    id.src = gJcb;
                    break;
                case 'gLaser':
                    id.src = gLaser;
                    break;
                case 'gMastercard':
                    id.src = gMastercard;
                    break;
                case 'gVisa':
                    id.src = gVisa;
                    break;
                case 'gVisaelectron':
                    id.src = gVisaelectron;
                    break;
                case 'gOthers':
                    id.src = gOthers;
                    break;
                case 'gSolo':
                    id.src = gSolo;
                    break;
                default:
                    id.src = gBlank;
                    break;
            }
            id.style.width = '32px';
            id.style.height = '24px';
        } catch (err) {
            alert(err.toString());
        }
    });
	function tryValidateCard(result) {
        try {
            var pth = gBlank;
            if (result.card_type != null) {
                pth = result.url;
            }
            var len = 0;
            try {
                var txt = document.getElementById("card_number").value;
                txt = numOnly(txt);
                len = txt.length;
            } catch (err) {}
            setCardNumberImage(pth, result.card_type != null && result.valid ? gValid : gInvalid);
            var cnt = len <= 0 ? '' : ('(' + len.toString() + ')');
            var typ = (result.card_type == null ? ' - ' : result.card_type.name);
            typ = typ.replace(/_/g, ' ');
            typ = typ.toUpperCase();
            var vun = result.valid_luhn;
            var lun = vun < 0 || !result.length_valid || result.valid ? '' : ('<' + 'span style="font-size: 1em; color: green;">( ' + vun.toString() + ' )' + '<' + '/span>');
            pth = '<' + 'pre>' +
                '<' + 'table class="tableA" id="t02" style="width: 100%; min-width: 300px;">' +
                '<' + 'tbody>' +
                '<' + 'tr>' + '<' + 'td>Card Type' + '<' + '/td>' + '<' + 'td style="min-width: 150px;" >' + typ + '<' + '/td>' + '<' + '/tr>' +
                '<' + 'tr>' + '<' + 'td>Valid ' + '<' + '/td>' + '<' + 'td>' + result.valid + '<' + '/td>' + '<' + '/tr>' +
                '<' + 'tr>' + '<' + 'td>IsValidLength ' + '<' + '/td>' + '<' + 'td>' + result.length_valid + ' ' + cnt + '<' + '/td>' + '<' + '/tr>' +
                '<' + 'tr>' + '<' + 'td>IsValidChecker ' + '<' + '/td>' + '<' + 'td>' + result.luhn_valid + ' ' + lun + '<' + '/td>' + '<' + '/tr>' +
                '<' + '/tbody>' +
                '<' + '/table>' +
                '<' + '/pre>';

            $('.log').html(pth);
            if(result.valid){
                ShowDialogBox('Information', 'Card Number Valid', 'Ok', '');
            }
        } catch (err) {
            return false;
        }
    }
	var result;
    $('#card_number').validateCreditCard(tryValidateCard(result));
    $('#tryValidateCardNow').click(tryValidateCard(result));
    function numOnly(number) {
        return number.replace(/[ -]/g, '');
    };
    function getTextStyle(id) {
        id.css('color', '#666');
        id.css('font-family', 'arial');
        id.css('text-shadow', '1px 1px 2px #999 , 0 0 4px rgba(30 , 150 , 255 , 0.45) , 0 0 2px lightcyan');
        id.css('min-width', '400 px');
    }
    $("[id^='textStyle']").each(function() {
        getTextStyle($(this));
    });

    $("body").css('display', 'block');
});
