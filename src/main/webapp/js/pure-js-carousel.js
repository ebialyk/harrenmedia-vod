/*
  -----------------------------------------------------------
  A pure JavaScript carousel plugin (pureJSCarousel)
  Author name : Vadim Shymko
  Author URI  : http://ninjadev.pw
  version     : 1.1
  -----------------------------------------------------------
*/

function pureJSCarousel (options) {

  var containerSelector = options.container,
      itemSelector      = options.item || options.container + ' > div',
      nextBtnSelector   = options.nextBtn           || false,
      prevBtnSelector   = options.prevBtn           || false,
      infinite          = options.infinite          || false,
      scrollingOneByOne = options.scrollingOneByOne || false,
      scrollingSpeed    = parseInt(options.speed)   || 500,
      scrollingEffect   = options.effect            || 'ease',
      scrollingDelay    = parseInt(options.delay)   || 0,
      onInit            = options.onInit            || false,
      onResize          = options.onResize          || false,
      itemLength,
      nextBtn,
      prevBtn,
      resizedContainer,
      resizedList,
      oldDotsLength,
      oldDotIndex,
      n,
      resizeTimer,
      r,
      container,
      list,
      dotsContainer,
      dotItem,
      dotBtn,
      dotsLength,
      d,
      startTouchPositionX,
      activeTouchPositionX,
      startTouchMargin,
      touchDirection,
      activeList,
      c,
      marginDirection,
      l,
      i;

  for (i = 0; i < document.querySelectorAll(containerSelector).length; i++) {

    if (onInit !== false) {
      onInit();
    }

    container = document.querySelectorAll(containerSelector)[i];
    container.className += ' pure-js-carousel-container';

    itemLength = container.querySelectorAll(itemSelector).length;

    list = document.createElement('div');
    list.className = 'pure-js-carousel-list';
    list.setAttribute('data-allow-scrolling', 'true');
    list.setAttribute('data-active-index', 0);
    list.setAttribute('data-prev-index', 1);
    list.setAttribute('data-active-item-index', 0);
    container.appendChild(list);

    for (c = 0; c < itemLength; c++) {
      container.querySelectorAll(itemSelector)[0].className += ' pure-js-carousel-item pure-js-carousel-item-' + c;
      container.querySelectorAll(itemSelector)[0].setAttribute('data-index', c);
      list.appendChild(container.querySelectorAll(itemSelector)[0]);
    }

    if (infinite === true) {
      list.innerHTML += (list.innerHTML + list.innerHTML);
      list.style.marginLeft =  - ((list.querySelectorAll('.pure-js-carousel-item').length / 3) * list.querySelector('.pure-js-carousel-item').offsetWidth) + 'px';
    } else {
      list.style.marginLeft = 0 + 'px';
    }
    list.style.width = list.querySelectorAll('.pure-js-carousel-item').length * list.querySelector('.pure-js-carousel-item').offsetWidth + 'px';
    list.setAttribute('data-index', 0);

    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
      addListener(list, 'touchstart', touchStart);
      addListener(list, 'touchmove', touchMove);
      addListener(list, 'touchend', touchEnd);
    }

    if (nextBtnSelector === false) {
      nextBtn = document.createElement('button');
      nextBtn.setAttribute('type', 'button');
      container.appendChild(nextBtn);
    } else {
      nextBtn = container.querySelector(nextBtnSelector);
    }
    nextBtn.className += ' pure-js-carousel-btn pure-js-carousel-btn-next';
    nextBtn.setAttribute('data-direction', 'next');
    addListener(nextBtn, 'click', btnClick);
    if (prevBtnSelector === false) {
      prevBtn = document.createElement('button');
      prevBtn.setAttribute('type', 'button');
      container.appendChild(prevBtn);
    } else {
      prevBtn = container.querySelector(prevBtnSelector);
    }
    prevBtn.className += ' pure-js-carousel-btn pure-js-carousel-btn-prev';
    prevBtn.setAttribute('data-direction', 'prev');
    addListener(prevBtn, 'click', btnClick);

    dotsContainer = document.createElement('ul');
    dotsContainer.className = 'pure-js-carousel-dot-list';
    dotsContainer.setAttribute('data-active-dot-index', 0);
    list.parentNode.appendChild(dotsContainer);
    createDots(list);

  }

  addListener(window, 'resize', resizeCarousel);

  function touchStart(event) {
    if (this.getAttribute('data-allow-scrolling') === 'true') {
      startTouchPositionX = event.targetTouches[0].pageX;
      startTouchMargin = parseInt(this.style.marginLeft);
    }
  }
  function touchMove(event) {
    activeTouchPositionX = event.targetTouches[0].pageX;
    this.style.marginLeft = startTouchMargin + (activeTouchPositionX - startTouchPositionX) + 'px';
  }
  function touchEnd() {
    if (activeTouchPositionX > startTouchPositionX) {
      touchDirection = 'prev';
    } else if (activeTouchPositionX < startTouchPositionX) {
      touchDirection = 'next';
    }
    if (Math.abs(activeTouchPositionX - startTouchPositionX) > (this.querySelector('.pure-js-carousel-item').offsetWidth / 2)) {
      scrolling(touchDirection, this, 'touch');
    } else {
      this.setAttribute('data-allow-scrolling', 'false');
      if (this.style.transition !== 'undefined') {
        this.style.transition = 'margin-left ' + scrollingSpeed + 'ms ' + scrollingEffect + ' ' + scrollingDelay + 'ms';
        if (this.style.webkitTransition !== 'undefined') {
          this.style.webkitTransition = 'margin-left ' + scrollingSpeed + 'ms ' + scrollingEffect + ' ' + scrollingDelay + 'ms';
        }
        activeList = this;
        setTimeout(function() {
          activeList.style.transition = 'margin-left 0ms';
          if (this.style.webkitTransition !== 'undefined') {
            this.style.webkitTransition = 'margin-left 0ms';
          }
          activeList.setAttribute('data-allow-scrolling', 'true');
        }, scrollingSpeed + scrollingDelay);
      } else {
        this.setAttribute('data-allow-scrolling', 'true');
      }
      this.style.marginLeft = startTouchMargin + 'px';
    }
  }

  function btnClick() {
    if (this.parentNode.querySelector('.pure-js-carousel-list').getAttribute('data-allow-scrolling') === 'true') {
      scrolling(this.getAttribute('data-direction'), this.parentNode.querySelector('.pure-js-carousel-list'), 'btn');
    }
  }

  function createDots(dotsList) {
    if (scrollingOneByOne === true) {
      if (infinite === true) {
        dotsLength = dotsList.querySelectorAll('.pure-js-carousel-item').length / 3;
      } else {
        dotsLength = dotsList.querySelectorAll('.pure-js-carousel-item').length;
      }
    } else {
      if (infinite === true) {
        dotsLength = Math.ceil(dotsList.offsetWidth / dotsList.parentNode.offsetWidth) / 3;
      } else {
        dotsLength = Math.ceil(dotsList.offsetWidth / dotsList.parentNode.offsetWidth);
      }
    }

    for (d = 0; d < dotsLength; d++) {
      dotItem = document.createElement('li');
      dotItem.className = 'pure-js-carousel-dot-item';
      if (d === parseInt(dotsList.parentNode.querySelector('.pure-js-carousel-dot-list').getAttribute('data-active-dot-index'))) {
        dotItem.className += ' active';
      }
      dotBtn = document.createElement('button');
      dotBtn.className = 'pure-js-carousel-dot-btn';
      dotBtn.setAttribute('type', 'button');
      dotBtn.setAttribute('data-index', d);
      addListener(dotBtn, 'click', dotClick);
      dotItem.appendChild(dotBtn);
      dotsList.parentNode.querySelector('.pure-js-carousel-dot-list').appendChild(dotItem);
    }
  }

  function dotClick() {
    if (this.parentNode.parentNode.parentNode.querySelector('.pure-js-carousel-list').getAttribute('data-allow-scrolling') === 'true') {
      this.parentNode.parentNode.setAttribute('data-active-dot-index', this.getAttribute('data-index'));
      if (this.parentNode.className.indexOf('active') === -1) {
        if (parseInt(this.getAttribute('data-index')) > parseInt(this.parentNode.parentNode.querySelector('.pure-js-carousel-dot-item.active button').getAttribute('data-index'))) {
          scrolling('next', this.parentNode.parentNode.parentNode.querySelector('.pure-js-carousel-list'), 'dot');
        } else {
          scrolling('prev', this.parentNode.parentNode.parentNode.querySelector('.pure-js-carousel-list'), 'dot');
        }

      }
    }
  }

  function scrolling(direction, scrollableList, trigger) {
    scrollableList.setAttribute('data-allow-scrolling', 'false');
    if (scrollableList.style.transition !== 'undefined') {
      scrollableList.style.transition = 'margin-left ' + scrollingSpeed + 'ms ' + scrollingEffect + ' ' + scrollingDelay + 'ms';
      if (scrollableList.style.webkitTransition !== 'undefined') {
        scrollableList.style.webkitTransition = 'margin-left ' + scrollingSpeed + 'ms ' + scrollingEffect + ' ' + scrollingDelay + 'ms';
      }
    }
    if (direction === 'next') {
      if (infinite === true) {
        if (trigger === 'dot') {
          scrollableList.setAttribute('data-prev-index', scrollableList.parentNode.querySelector('.pure-js-carousel-dot-item.active button').getAttribute('data-index'));
          scrollableList.setAttribute('data-active-index', parseInt(scrollableList.parentNode.querySelector('.pure-js-carousel-dot-list').getAttribute('data-active-dot-index')));
        } else {
          scrollableList.setAttribute('data-prev-index', scrollableList.getAttribute('data-active-index'));
          scrollableList.setAttribute('data-active-index', parseInt(scrollableList.getAttribute('data-active-index')) + 1);
          if ((scrollingOneByOne === true && parseInt(scrollableList.getAttribute('data-active-index')) > (scrollableList.querySelectorAll('.pure-js-carousel-item').length/3) - 1) || (scrollingOneByOne === false && parseInt(scrollableList.getAttribute('data-active-index')) > Math.ceil((scrollableList.offsetWidth / 3) / scrollableList.parentNode.offsetWidth) - 1)) {
            scrollableList.setAttribute('data-active-index', 0);
          }
        }
        if (scrollingOneByOne === true) {
          if (parseInt(scrollableList.getAttribute('data-active-index')) === 0) {
            scrollableList.style.marginLeft = (- scrollableList.offsetWidth / 3) - scrollableList.querySelector('.pure-js-carousel-item').offsetWidth + 'px';
          } else {
            scrollableList.style.marginLeft = (- scrollableList.offsetWidth / 3) - (Math.abs(parseInt(scrollableList.getAttribute('data-active-index')) - parseInt(scrollableList.getAttribute('data-prev-index'))) * scrollableList.querySelector('.pure-js-carousel-item').offsetWidth) + 'px';
          }
        } else {
          if (parseInt(scrollableList.getAttribute('data-active-index')) === 0) {
            scrollableList.style.marginLeft = (- scrollableList.offsetWidth / 3) - scrollableList.parentNode.offsetWidth + 'px';
          } else if (parseInt(scrollableList.getAttribute('data-active-index')) === Math.ceil((scrollableList.offsetWidth / 3) / scrollableList.parentNode.offsetWidth) - 1) {
            scrollableList.style.marginLeft =  - (scrollableList.offsetWidth / 3) - ((scrollableList.offsetWidth / 3) - (scrollableList.parentNode.offsetWidth * (parseInt(scrollableList.getAttribute('data-prev-index')) + 1))) + 'px';
          } else {
            scrollableList.style.marginLeft = - (scrollableList.offsetWidth / 3) - (Math.abs(parseInt(scrollableList.getAttribute('data-active-index')) - parseInt(scrollableList.getAttribute('data-prev-index'))) * scrollableList.parentNode.offsetWidth) + 'px';
          }
        }
        marginDirection = Math.abs((scrollableList.offsetWidth/3) - Math.abs(parseInt(scrollableList.style.marginLeft)));
        if (scrollableList.style.transition !== 'undefined') {
          setTimeout(function() {
            scrollableList.style.transition = 'margin-left 0ms';
            if (scrollableList.style.webkitTransition !== 'undefined') {
              scrollableList.style.webkitTransition = 'margin-left 0ms';
            }
            for (l = 0; l < marginDirection/scrollableList.querySelector('.pure-js-carousel-item').offsetWidth; l++) {
              scrollableList.appendChild(scrollableList.querySelectorAll('.pure-js-carousel-item')[0]);
            }
            scrollableList.style.marginLeft = - (scrollableList.offsetWidth / 3 ) + 'px';
            scrollableList.setAttribute('data-allow-scrolling', 'true');
          }, scrollingSpeed + scrollingDelay);
        } else {
          for (l = 0; l < marginDirection/scrollableList.querySelector('.pure-js-carousel-item').offsetWidth; l++) {
            scrollableList.appendChild(scrollableList.querySelectorAll('.pure-js-carousel-item')[0]);
          }
          scrollableList.style.marginLeft = - (scrollableList.offsetWidth / 3 ) + 'px';
          scrollableList.setAttribute('data-allow-scrolling', 'true');
        }
      } else {
        if (trigger === 'dot') {
          scrollableList.setAttribute('data-active-index', parseInt(scrollableList.parentNode.querySelector('.pure-js-carousel-dot-list').getAttribute('data-active-dot-index')));
        } else {
          if (scrollingOneByOne === true) {
            scrollableList.setAttribute('data-active-index', Math.min(parseInt(scrollableList.getAttribute('data-active-index')) + 1, scrollableList.querySelectorAll('.pure-js-carousel-item').length - 1));
          } else {
            scrollableList.setAttribute('data-active-index', Math.min(parseInt(scrollableList.getAttribute('data-active-index')) + 1, Math.ceil(scrollableList.offsetWidth / scrollableList.parentNode.offsetWidth) - 1));
          }
        }
        if (scrollingOneByOne === true) {
          scrollableList.style.marginLeft = Math.max(- (parseInt(scrollableList.getAttribute('data-active-index')) * scrollableList.querySelector('.pure-js-carousel-item').offsetWidth), -(scrollableList.offsetWidth - scrollableList.parentNode.offsetWidth)) + 'px';
        } else {
          scrollableList.style.marginLeft = Math.max(- (parseInt(scrollableList.getAttribute('data-active-index')) * scrollableList.parentNode.offsetWidth), -(scrollableList.offsetWidth - scrollableList.parentNode.offsetWidth)) + 'px';
        }
        if (scrollableList.style.transition !== 'undefined') {
          setTimeout(function() {
            scrollableList.style.transition = 'margin-left 0ms';
            if (scrollableList.style.webkitTransition !== 'undefined') {
              scrollableList.style.webkitTransition = 'margin-left 0ms';
            }
            scrollableList.setAttribute('data-allow-scrolling', 'true');
          }, scrollingSpeed + scrollingDelay);
        } else {
          scrollableList.setAttribute('data-allow-scrolling', 'true');
        }
      }
    } else if (direction === 'prev') {
      if (infinite === true) {
        if (trigger === 'dot') {
          scrollableList.setAttribute('data-prev-index', parseInt(scrollableList.parentNode.querySelector('.pure-js-carousel-dot-item.active button').getAttribute('data-index')));
          scrollableList.setAttribute('data-active-index', parseInt(scrollableList.parentNode.querySelector('.pure-js-carousel-dot-list').getAttribute('data-active-dot-index')));
        } else {
          scrollableList.setAttribute('data-prev-index', parseInt(scrollableList.getAttribute('data-active-index')));
          scrollableList.setAttribute('data-active-index', parseInt(scrollableList.getAttribute('data-active-index')) - 1);
          if (parseInt(scrollableList.getAttribute('data-active-index')) < 0) {
            if (scrollingOneByOne === true) {
              scrollableList.setAttribute('data-active-index', (scrollableList.querySelectorAll('.pure-js-carousel-item').length / 3) - 1);
            } else {
              scrollableList.setAttribute('data-active-index', Math.ceil(scrollableList.offsetWidth / (3 * scrollableList.parentNode.offsetWidth)) - 1);
            }
          }
        }
        if (scrollingOneByOne === true) {
          if (parseInt(scrollableList.getAttribute('data-active-index')) === (scrollableList.querySelectorAll('.pure-js-carousel-item').length / 3) - 1) {
            scrollableList.style.marginLeft = - ((scrollableList.offsetWidth/3) - scrollableList.querySelector('.pure-js-carousel-item').offsetWidth) + 'px';
          } else {
            scrollableList.style.marginLeft = - ((scrollableList.offsetWidth/3) - (scrollableList.querySelector('.pure-js-carousel-item').offsetWidth * (parseInt(scrollableList.getAttribute('data-prev-index')) - parseInt(scrollableList.getAttribute('data-active-index'))))) + 'px';
          }
        } else {
          if (parseInt(scrollableList.getAttribute('data-active-index')) === Math.ceil(scrollableList.offsetWidth / (3 * scrollableList.parentNode.offsetWidth)) - 1) {
            scrollableList.style.marginLeft = (- scrollableList.offsetWidth / 3) + scrollableList.parentNode.offsetWidth + 'px';
          } else if (parseInt(scrollableList.getAttribute('data-prev-index')) === Math.ceil(scrollableList.offsetWidth / (3 * scrollableList.parentNode.offsetWidth)) - 1) {
            scrollableList.style.marginLeft = (Math.abs(parseInt(scrollableList.getAttribute('data-prev-index')) - parseInt(scrollableList.getAttribute('data-active-index'))) - (Math.ceil(scrollableList.offsetWidth / (3 * scrollableList.parentNode.offsetWidth)) - 1))*scrollableList.parentNode.offsetWidth - scrollableList.parentNode.offsetWidth + 'px';
          } else {
            scrollableList.style.marginLeft = (- scrollableList.offsetWidth / 3) + (Math.abs(parseInt(scrollableList.getAttribute('data-prev-index')) - parseInt(scrollableList.getAttribute('data-active-index'))) * scrollableList.parentNode.offsetWidth) + 'px';
          }
        }
        marginDirection = Math.abs((scrollableList.offsetWidth/3) - Math.abs(parseInt(scrollableList.style.marginLeft)));
        if (scrollableList.style.transition !== 'undefined') {
          setTimeout(function() {
            scrollableList.style.transition = 'margin-left 0ms';
            if (scrollableList.style.webkitTransition !== 'undefined') {
              scrollableList.style.webkitTransition = 'margin-left 0ms';
            }
            for (l = 0; l < marginDirection/scrollableList.querySelector('.pure-js-carousel-item').offsetWidth; l++) {
              scrollableList.insertBefore(scrollableList.querySelectorAll('.pure-js-carousel-item')[scrollableList.querySelectorAll('.pure-js-carousel-item').length - 1], scrollableList.querySelectorAll('.pure-js-carousel-item')[0]);
            }
            scrollableList.style.marginLeft = - (scrollableList.offsetWidth / 3 ) + 'px';
            scrollableList.setAttribute('data-allow-scrolling', 'true');
          }, scrollingSpeed + scrollingDelay);
        } else {
          for (l = 0; l < marginDirection/scrollableList.querySelector('.pure-js-carousel-item').offsetWidth; l++) {
            scrollableList.insertBefore(scrollableList.querySelectorAll('.pure-js-carousel-item')[scrollableList.querySelectorAll('.pure-js-carousel-item').length - 1], scrollableList.querySelectorAll('.pure-js-carousel-item')[0]);
          }
          scrollableList.style.marginLeft = - (scrollableList.offsetWidth / 3 ) + 'px';
          scrollableList.setAttribute('data-allow-scrolling', 'true');
        }
      } else {
        if (trigger === 'dot') {
          scrollableList.setAttribute('data-active-index', parseInt(scrollableList.parentNode.querySelector('.pure-js-carousel-dot-list').getAttribute('data-active-dot-index')));
        } else {
          scrollableList.setAttribute('data-active-index', Math.max(0, parseInt(scrollableList.getAttribute('data-active-index')) - 1));
        }
        if (scrollingOneByOne === true) {
          scrollableList.style.marginLeft = Math.min(- (parseInt(scrollableList.getAttribute('data-active-index')) * scrollableList.querySelector('.pure-js-carousel-item').offsetWidth), 0) + 'px';
        } else {
          scrollableList.style.marginLeft = Math.min(- (parseInt(scrollableList.getAttribute('data-active-index')) * scrollableList.parentNode.offsetWidth), 0) + 'px';
        }
        if (scrollableList.style.transition !== 'undefined') {
          setTimeout(function() {
            scrollableList.style.transition = 'margin-left 0ms';
            if (scrollableList.style.webkitTransition !== 'undefined') {
              scrollableList.style.webkitTransition = 'margin-left 0ms';
            }
            scrollableList.setAttribute('data-allow-scrolling', 'true');
          }, scrollingSpeed + scrollingDelay);
        } else {
          scrollableList.setAttribute('data-allow-scrolling', 'true');
        }
      }
    }
    if (trigger !== 'dot') {
      scrollableList.parentNode.querySelector('.pure-js-carousel-dot-list').setAttribute('data-active-dot-index', parseInt(scrollableList.getAttribute('data-active-index')));
    }
    scrollableList.parentNode.querySelector('.pure-js-carousel-dot-item.active').className = scrollableList.parentNode.querySelector('.pure-js-carousel-dot-item.active').className.replace(' active', '');
    scrollableList.parentNode.querySelectorAll('.pure-js-carousel-dot-item')[parseInt(scrollableList.parentNode.querySelector('.pure-js-carousel-dot-list').getAttribute('data-active-dot-index'))].className += ' active';
    if (scrollingOneByOne === true) {
      scrollableList.setAttribute('data-active-item-index', parseInt(scrollableList.getAttribute('data-active-index')));
    } else {
      if (infinite === true) {
        scrollableList.setAttribute('data-active-item-index', Math.min((scrollableList.querySelectorAll('.pure-js-carousel-item').length / 3) - (scrollableList.parentNode.offsetWidth / scrollableList.querySelector('.pure-js-carousel-item').offsetWidth), (scrollableList.parentNode.offsetWidth * parseInt(scrollableList.getAttribute('data-active-index'))) / scrollableList.querySelector('.pure-js-carousel-item').offsetWidth));
      } else {
        scrollableList.setAttribute('data-active-item-index', Math.min(scrollableList.querySelectorAll('.pure-js-carousel-item').length - (scrollableList.parentNode.offsetWidth / scrollableList.querySelector('.pure-js-carousel-item').offsetWidth), (scrollableList.parentNode.offsetWidth * parseInt(scrollableList.getAttribute('data-active-index'))) / scrollableList.querySelector('.pure-js-carousel-item').offsetWidth));
      }
    }
  }

  function resizeCarousel() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      scrollingSpeed = 0;
      scrollingDelay = 0;
      if (onResize !== false) {
        onResize();
      }
      for (r = 0; r < document.querySelectorAll(containerSelector).length; r++) {
        resizedContainer = document.querySelectorAll(containerSelector)[r];
        resizedList = resizedContainer.querySelector('.pure-js-carousel-list');

        resizedList.style.width = resizedList.querySelectorAll('.pure-js-carousel-item').length * resizedList.querySelector('.pure-js-carousel-item').offsetWidth + 'px';
        if (infinite === true) {
          resizedList.style.marginLeft = - ((resizedList.querySelectorAll('.pure-js-carousel-item').length / 3) * resizedList.querySelector('.pure-js-carousel-item').offsetWidth) + 'px';
        } else {
          resizedList.style.marginLeft = 0 + 'px';
        }

        if (parseInt(resizedList.querySelector('.pure-js-carousel-item').getAttribute('data-index')) !== 0) {
          for (n = parseInt(resizedList.querySelector('.pure-js-carousel-item').getAttribute('data-index')); n < resizedList.querySelectorAll('.pure-js-carousel-item').length; n++) {
            resizedList.appendChild(resizedList.querySelector('.pure-js-carousel-item'));
          }
        }

        oldDotsLength = resizedContainer.querySelectorAll('.pure-js-carousel-dot-item').length;
        resizedContainer.querySelector('.pure-js-carousel-dot-list').setAttribute('data-active-dot-index', 0);
        for (oldDotIndex = 0; oldDotIndex < oldDotsLength; oldDotIndex++) {
          resizedContainer.querySelector('.pure-js-carousel-dot-list').removeChild(resizedContainer.querySelectorAll('.pure-js-carousel-dot-item')[0]);
        }
        createDots(resizedList);

        if (scrollingOneByOne === true) {
          resizedContainer.querySelectorAll('.pure-js-carousel-dot-item')[parseInt(resizedList.getAttribute('data-active-item-index'))].click();
        } else {
          if (parseInt(resizedList.getAttribute('data-active-index')) === (oldDotsLength) - 1) {
            resizedContainer.querySelectorAll('.pure-js-carousel-dot-item')[resizedContainer.querySelectorAll('.pure-js-carousel-dot-item').length - 1].querySelector('button').click();
          } else {
            resizedContainer.querySelectorAll('.pure-js-carousel-dot-item')[Math.round(parseInt(resizedList.getAttribute('data-active-item-index')) / (resizedContainer.offsetWidth / resizedList.querySelector('.pure-js-carousel-item').offsetWidth))].querySelector('button').click();
          }
        }
      }
      scrollingSpeed = parseInt(options.speed) || 500;
      scrollingDelay = parseInt(options.delay) || 0;
    }, 250);
  }

  function addListener(element, eventType, functionName) {
    if (element.addEventListener) {
      element.addEventListener(eventType, functionName);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventType, function() {
        functionName.call(element);
      });
    } else {
      element['on' + eventType] = functionName;
    }
  }

}
