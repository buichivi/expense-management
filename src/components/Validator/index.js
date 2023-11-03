// Đối tượng Validator
function Validator(options) {
    function getParent(element, selector) {
        while(element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }


    // Lưu trữ các rules
    var selectorRules = {};


    // Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
                    
        // Lấy ra các rule của selector
        var rules = selectorRules[rule.selector];

        // Lặp qua từng rule và kiểm tra
        for (let i = 0; i < rules.length; i++) {
            switch(inputElement.type) {
                case 'checkbox':
                case 'radio':
                    errorMessage = rules[i](
                        formELement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);

            }
            // Nếu có lỗi thì dừng kiểm tra
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }

        return !errorMessage;
    }
    
    // Lấy element của form cần validate
    var formELement = document.querySelector(options.form);


    if (formELement) {
        formELement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true;
            // Lặp qua từng rule và validate
            options.rules.forEach(function(rule) {
                var inputElement = formELement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });
            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formELement.querySelectorAll('[name]');

                    var countRadio = 0;
                    var countCheckBox = 0;
                    var formValues = Array.from(enableInputs).reduce(function(values, input) {
                        switch(input.type) {
                            case 'checkbox':
                                if (!input.checked) {
                                    if (countCheckBox == 0) {
                                        values[input.name] = '';
                                    }
                                    break;
                                }
                                countCheckBox++;
                                if (Array.isArray(values[input.name])) {
                                    values[input.name].push(input.value);
                                }
                                else {
                                    values[input.name] = [input.value];
                                }
                                break;
                            case 'radio':
                                if (input.checked) {
                                    values[input.name] = input.value;
                                }
                                else {
                                    if (values[input.name]) {
                                        break;
                                    }
                                    countRadio++;
                                    if (countRadio == formELement.querySelectorAll('[name="' + input.name + '"]').length) {
                                        values[input.name] = '';
                                        countRadio = 0;
                                    }
                                }
                                break; 
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formELement.submit();
                }
            }
        }
        
        options.rules.forEach(function(rule) {
            
            // Lưu lại các rule cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formELement.querySelectorAll(rule.selector);
            Array.from(inputElements).forEach(function(inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }

                inputElement.onchange = function() {
                    if (inputElement.value == '' || inputElement.value == -1) {
                        validate(inputElement, rule);
                        return;
                    }
                    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
                }
            });
        })
    }
}


// Định nghĩa rules
// Nguyên tắc của các rules:
// 1. Khi có lỗi => trả ra message lỗi
// 2. Khi hợp lệ => không trả lại gì cả(undefined)
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            // Nếu input là kiểu radio, checkbox không checked
            if (value === null) {
                value = '';
            }
            // Nếu input là kiểu radio, checkbox khi checked
            else if (typeof value === 'object') {
                return undefined;
            }
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này';   
        }
    };
}

Validator.isNumber = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return !isNaN(Number('+' + value)) ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isExist = function (selector, listType, message) {
    return {
        selector: selector,
        test: function (value) {
            return !listType.some((type) => type === value.trim()) ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email';
        }
    };
}

Validator.minLength = function(selector, min, message) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    };
}

Validator.isConfirmed = function(selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function(value) {
            return value === getConfirmValue() ? undefined : message || `Giá trị nhập vào không chính xác`;
        }
    };
}


export default Validator