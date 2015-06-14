$(function() {

	$.fn.hasAttr = function(attribute) {
		var attr = this.attr(attribute);
		if (typeof attr !== typeof undefined && attr !== false) 
			return true;
		return false;
	}

	$.fn.materialInput = function() {

		this.find('input, textarea').each(function(i) {

			if(isValidType($(this))) {

				var name = $(this).attr('name');

				$(this).attr('id', name);

				var $wrap = $(this).wrap("<div class='material-input'></div>").parent();

				var tagName = $(this).prop("tagName").toLowerCase();

				$wrap.addClass(tagName);
				
				var placeholder = $(this).attr('placeholder');

				if(placeholder) {
					$wrap.append("<label for='" + name + "'>" + placeholder + "</label>");
					$(this).removeAttr('placeholder');
				}

				addFilled($(this));

			}

		});

		this.find('input, textarea').on('blur', function() {

			if($(this).parent().parent().find('.icon'))
				$(this).parent().parent().find('.icon').removeClass('focussed')

			if(isValidType($(this)))
				addFilled($(this))

		});

		this.find('input, textarea').on('focus', function() {

			if($(this).parent().parent().find('.icon'))
				$(this).parent().parent().find('.icon').addClass('focussed')

		});



		// Radio

		function isValidType($el) {
			var type = $el.attr('type');
			return (type = 'hidden' && type != 'submit' && type != 'checkbox' && type != 'radio' && type != 'file' ? 1 : 0);
		}

		function isType($el, type) {
			var el_type = $el.attr('type');
			return (el_type == type);
		}

		function addFilled($el) {
			if($el.val())
				$el.addClass('filled');
			else
				$el.removeClass('filled');
		}

	};

	$('.material').materialInput();

});