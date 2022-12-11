$(function() {
    class SpanWrap {
        constructor(target) {
            this.target = this.convertElement(target);
            this.nodes = [...this.target.childNodes];
            this.convert();
        }

        convert() {

            let spanWrapText = ""

            this.nodes.forEach((node) => {
                if (node.nodeType == 3) {
                    const text = node.textContent.replace(/\r?\n/g, '');
                    spanWrapText = spanWrapText + text.split('').reduce((acc, v) => {
                    return acc + `<span>${v}</span>`
                }, "");
                } else {
                    spanWrapText = spanWrapText + node.outerHTML
                }
            })
            this.target.innerHTML = spanWrapText
            $('.text-move span:nth-child(n+8):nth-child(-n+13)').addClass('thin');
            $('.type-move-thin span:nth-child(n+1):nth-child(-n+6)').addClass('thin');
            $('.touring-move span:nth-child(n+9):nth-child(-n+16)').addClass('thin');
            $('.sports-move-thin span:nth-child(n+12):nth-child(-n+15)').addClass('thin');
            $('.sports-move-thin-second span:nth-child(n+1):nth-child(-n+5)').addClass('thin');
            $('.performance-thin span').addClass('thin');
            $('.performance-thin-second span:nth-child(n+1):nth-child(-n+3)').addClass('thin');
        }

        convertElement(element) {
            if (element instanceof HTMLElement) {
                return element
            }
            if (element instanceof jQuery) {
                return element[0]
            }
            return document.querySelector(element);
        }
    }
    const targets = [...document.querySelectorAll(".text-move, .type-move, .touring-move, .first-proxy")]

    targets.forEach( (target) => {
        new SpanWrap(target);
    })

    var $btn = $('.toggle-btn'),
        $btnArea = $('.btn-area'),
        $openNone = $('.btn-area > .d-none'),
        $backColor = $('.back-color'),
        $mask  = $('#mask');
    $btn.on('click', function() {
        if ( ! $btnArea.hasClass('open')) {
            $btnArea.addClass('open');
            $openNone.addClass('d-block');
            $backColor.addClass('ground')

        } else {
            $btnArea.removeClass('open');
            $openNone.removeClass('d-block');
            $backColor.removeClass('ground')
        }
    });
    $mask.on('click', function() {
        $btnArea.removeClass('open');
        $openNone.removeClass('d-block');
        $backColor.removeClass('ground')
    });


    $('a[href^="#"]').click(function() {
        var adjust = 0,
            speed = 400,
            href= $(this).attr("href"),
            target = $(href == "#" || href == "" ? 'html' : href),
            position = target.offset().top + adjust;

        $btnArea.removeClass('open');
        $openNone.removeClass('d-block');
        $backColor.removeClass('ground')

        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });


    if (window.matchMedia('(min-width:768px)').matches) {
        luxy.init({
            wrapperSpeed: 0.06,
        });

        gsap.set('.motor-sports', {
            autoAlpha: 0,
            y: 105,
        });
        gsap.to('.motor-sports', {
            scrollTrigger: {
                trigger : '.motor-sports',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'play none restart',
                onEnter: () => $('.nav ul li:nth-child(1)').addClass('is-active'),
                onLeave: () => {
                    gsap.to('.motor-sports', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },

            },
            duration: .6,
            y: 0,
            autoAlpha: 1,
        });

        gsap.set('.text-move span', {
            autoAlpha: 0,
            y: 105,
        });
        
        gsap.to('.text-move span', {
            scrollTrigger: {
                trigger : '.text-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onLeave: () => {
                    $('.nav ul li:nth-child(1)').removeClass('is-active'),
                    gsap.to('.text-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onEnterBack: () => $('.nav ul li:nth-child(1)').addClass('is-active'),
                onLeaveBack: () => {
                    gsap.to('.text-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });    

        gsap.set('.type-move span', {
            autoAlpha: 0,
            y:50,
        });
        gsap.to('.type-move span', {
            scrollTrigger: {
                trigger : '.type-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onEnter: () => $('.nav ul li:nth-child(2)').addClass('is-active'),
                onLeave: () => {
                    gsap.to('.type-move span', {
                        y: -50,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    $('.nav ul li:nth-child(2)').removeClass('is-active'),
                    gsap.to('.type-move span', {
                        y: -50,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },
            duration: .6,
            y: 0,
            autoAlpha: 1,
        });

        gsap.set('.formula-right-in, .touring-right-in', {
            autoAlpha: 0,
            x: 50,
        });
        gsap.to('.formula-right-in',{
            autoAlpha: 1,
            x: 0,
            duration: .6,
            scrollTrigger : {
                trigger : '.formula-target',
                start   : 'center-=10% bottom-=20%',
                end     : 'center top+=8%',
                toggleActions : 'restart reverse restart reverse',
            },
            stagger: {
                from: "start", 
                amount: .8,
            },
        });

        gsap.set('.prototype-left-in', {
            autoAlpha: 0,
            x: 50,
        });
        gsap.to('.prototype-left-in',{
            autoAlpha: 1,
            x: 0,
            duration: .6,
            scrollTrigger : {
                trigger : '.prototype-target',
                start   : 'center-=10% bottom-=20%',
                end     : 'center top+=8%',
                toggleActions : 'restart reverse restart reverse',
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

        });    
        

        gsap.set('.touring-right-in', {
            autoAlpha: 0,
            x: 50,
        });
        gsap.to('.touring-right-in',{
            autoAlpha: 1,
            x: 0,
            duration: .6,
            scrollTrigger : {
                trigger : '.touring-target',
                start   : 'center-=10% bottom-=20%',
                end     : 'center top+=8%',
                toggleActions : 'restart reverse restart reverse',
                onLeave : () => $('.nav ul li:nth-child(2)').removeClass('is-active'),
                onEnterBack : () => $('.nav ul li:nth-child(2)').addClass('is-active'),
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

        });    



        gsap.set('.touring-move span', {
            autoAlpha: 0,
            y: 105,
        });
        gsap.to('.touring-move span', {
            scrollTrigger: {
                trigger : '.touring-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onEnter: () => $('.nav ul li:nth-child(3)').addClass('is-active'),
                onLeave: () => {
                    gsap.to('.touring-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    $('.nav ul li:nth-child(3)').removeClass('is-active'),
                    gsap.to('.touring-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.bottom-moving', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.bottom-moving', {
            scrollTrigger: {
                trigger : '.bottom-moving',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                onLeave: () => {
                    gsap.to('.bottom-moving', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.bottom-moving', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.sports-move span', {
            autoAlpha: 0,
            y: 105,
        });

        gsap.to('.sports-move span', {
            scrollTrigger: {
                trigger : '.sports-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onEnterBack: () => $('.nav ul li:nth-child(3)').addClass('is-active'),
                onLeave: () => {
                    $('.nav ul li:nth-child(3)').removeClass('is-active'),
                    gsap.to('.sports-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.sports-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.bottom-fun', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.bottom-fun', {
            scrollTrigger: {
                trigger : '.bottom-fun',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(4)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.bottom-fun', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.bottom-fun', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });

        gsap.set('.cornering-bottom', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.cornering-bottom', {
            scrollTrigger: {
                trigger : '.cornering-bottom',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(5)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.cornering-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.cornering-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.sleepy-bottom', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.sleepy-bottom', {
            scrollTrigger: {
                trigger : '.sleepy-bottom',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(6)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.sleepy-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.sleepy-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.high-performance-move span', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.high-performance-move span', {
            scrollTrigger: {
                trigger : '.high-performance-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(7)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.high-performance-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.high-performance-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


    } else if (window.matchMedia('(max-width:768px)').matches) {
        luxy.init({
            wrapperSpeed: 0.06,
        });

        gsap.set('.motor-sports', {
            autoAlpha: 0,
            y: 105,
        });
        gsap.to('.motor-sports', {
            scrollTrigger: {
                trigger : '.motor-sports',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'play none restart',
                onEnter: () => $('.nav ul li:nth-child(1)').addClass('is-active'),
                onLeave: () => {
                    gsap.to('.motor-sports', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },

            },
            duration: .6,
            y: 0,
            autoAlpha: 1,
        });

        gsap.set('.text-move span', {
            autoAlpha: 0,
            y: 105,
        });
        
        gsap.to('.text-move span', {
            scrollTrigger: {
                trigger : '.text-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onLeave: () => {
                    $('.nav ul li:nth-child(1)').removeClass('is-active'),
                    gsap.to('.text-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onEnterBack: () => $('.nav ul li:nth-child(1)').addClass('is-active'),
                onLeaveBack: () => {
                    gsap.to('.text-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });    

        gsap.set('.type-move span', {
            autoAlpha: 0,
            y:50,
        });
        gsap.to('.type-move span', {
            scrollTrigger: {
                trigger : '.type-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onEnter: () => $('.nav ul li:nth-child(2)').addClass('is-active'),
                onLeave: () => {
                    gsap.to('.type-move span', {
                        y: -50,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    $('.nav ul li:nth-child(2)').removeClass('is-active'),
                    gsap.to('.type-move span', {
                        y: -50,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },
            duration: .6,
            y: 0,
            autoAlpha: 1,
        });

        gsap.set('.formula-right-in, .touring-right-in', {
            autoAlpha: 0,
            x: 50,
        });
        gsap.to('.formula-right-in',{
            autoAlpha: 1,
            x: 0,
            duration: .6,
            scrollTrigger : {
                trigger : '.formula-target',
                start   : 'center-=10% bottom-=20%',
                end     : 'center top+=8%',
                toggleActions : 'restart reverse restart reverse',
            },
            stagger: {
                from: "start", 
                amount: .8,
            },
        });

        gsap.set('.prototype-left-in', {
            autoAlpha: 0,
            x: -50,
        });
        gsap.to('.prototype-left-in',{
            autoAlpha: 1,
            x: 0,
            duration: .6,
            scrollTrigger : {
                trigger : '.prototype-target',
                start   : 'center-=10% bottom-=20%',
                end     : 'center top+=8%',
                toggleActions : 'restart reverse restart reverse',
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

        });    
        

        gsap.set('.touring-right-in', {
            autoAlpha: 0,
            x: 50,
        });
        gsap.to('.touring-right-in',{
            autoAlpha: 1,
            x: 0,
            duration: .6,
            scrollTrigger : {
                trigger : '.touring-target',
                start   : 'center-=10% bottom-=20%',
                end     : 'center top+=8%',
                toggleActions : 'restart reverse restart reverse',
                onLeave : () => $('.nav ul li:nth-child(2)').removeClass('is-active'),
                onEnterBack : () => $('.nav ul li:nth-child(2)').addClass('is-active'),
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

        });    





        gsap.set('.touring-move span', {
            autoAlpha: 0,
            y: 105,
        });
        gsap.to('.touring-move span', {
            scrollTrigger: {
                trigger : '.touring-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onEnter: () => $('.nav ul li:nth-child(3)').addClass('is-active'),
                onLeave: () => {
                    gsap.to('.touring-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    $('.nav ul li:nth-child(3)').removeClass('is-active'),
                    gsap.to('.touring-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.bottom-moving', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.bottom-moving', {
            scrollTrigger: {
                trigger : '.bottom-moving',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                onLeave: () => {
                    gsap.to('.bottom-moving', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.bottom-moving', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.sports-move span', {
            autoAlpha: 0,
            y: 105,
        });

        gsap.to('.sports-move span', {
            scrollTrigger: {
                trigger : '.sports-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                onEnterBack: () => $('.nav ul li:nth-child(3)').addClass('is-active'),
                onLeave: () => {
                    $('.nav ul li:nth-child(3)').removeClass('is-active'),
                    gsap.to('.sports-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.sports-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.bottom-fun', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.bottom-fun', {
            scrollTrigger: {
                trigger : '.bottom-fun',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(4)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.bottom-fun', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.bottom-fun', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });

        gsap.set('.cornering-bottom', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.cornering-bottom', {
            scrollTrigger: {
                trigger : '.cornering-bottom',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(5)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.cornering-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.cornering-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.sleepy-bottom', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.sleepy-bottom', {
            scrollTrigger: {
                trigger : '.sleepy-bottom',
                start   : 'top bottom-=20%',
                end     : 'center top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(6)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.sleepy-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.sleepy-bottom', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });


        gsap.set('.high-performance-move span', {
            autoAlpha: 0,
            y:105,
        });
        gsap.to('.high-performance-move span', {
            scrollTrigger: {
                trigger : '.high-performance-move span',
                start   : 'top bottom-=20%',
                end     : 'top top+=20%',
                toggleActions : 'restart none restart none',
                toggleClass : {targets : '.nav ul li:nth-child(7)', className : 'is-active'},
                onLeave: () => {
                    gsap.to('.high-performance-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
                onLeaveBack: () => {
                    gsap.to('.high-performance-move span', {
                        y: -105,
                        autoAlpha: 0,
                        duration: .6,

                        stagger: {
                            from: "start", 
                            amount: .8,
                        },                     
                    });
                },
            },
            stagger: {
                from: "start", 
                amount: .8,
            },

            duration: .6,
            y: 0,
            autoAlpha: 1,
        });
    }
});
