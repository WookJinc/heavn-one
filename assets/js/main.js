$(window).on('load', function () {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    gsap.ticker.add((time) => {
        lenis.raf(time * 300);
    });

    gsap.registerPlugin(ScrollTrigger);

    /* 공통 */
    let splitSpan = new SplitType("[data-split='true']", {
        types: "chars",
        tagName: "span"
    })

    // 호버 애니메이션 
    $(".hover-wrap").each(function () {
        let $this = $(this);
        let upCharTextMotion = gsap.timeline({
            paused: true
        });

        upCharTextMotion
            .to($this.find('.line1 .char'), {
                yPercent: -100,
                opacity: 1,
                duration: 0.2
            })
            .to($this.find('.line2 .char'), {
                yPercent: -100,
                opacity: 1,
                duration: 0.2
            });

        $this.hover(
            function () {
                upCharTextMotion.restart();
            },
            function () {
                upCharTextMotion.reverse();
            }
        );
    });

    // preload
    preloadMotion = gsap.timeline({
        onComplete: () => {
            $(".preload").addClass("hide");
            introMotion.restart();
        }
    })
    preloadMotion
        .from(".preload .bg", {
            opacity: 0,
            duration: 0.8
        })
        .from(".preload .logo", {
            opacity: 0,
            duration: 0.8
        }, "-=0.3")
        .to(".preload", {
            opacity: 0,
            duration: 1
        })

    // sc-heavn
    introMotion = gsap.timeline({
        paused: true
    });
    introMotion
        .from('.sc-heavn .text-motion .char', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
        })
        .from('.sc-heavn .text-motion2 .char', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        })

    gsap.matchMedia().add("(min-width: 1201px)", function () {
        gsap.to(".sc-heavn .bg img", {
            scale: 1,
            scrollTrigger: {
                trigger: ".sc-heavn",
                start: "top top",
                end: "50% 100%",
                scrub: true,
                // markers: true
            }
        });

        heavnMotion1 = gsap.timeline({
            scrollTrigger: {
                trigger: ".sc-heavn",
                start: "50% 100%",
                end: "100% 100%",
                scrub: true
            }
        });

        heavnMotion1
            .to(".sc-heavn .bg img", {
                scale: 1.3,
                duration: 1,
                ease: "power2.inOut"
            })
            .to([".sc-heavn .title", ".sc-heavn .desc"], {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    $(".sc-heavn .title, .sc-heavn .desc").addClass("hide").css("opacity", "0");
                }
            }, "<");

        heavnMotion2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".sc-heavn",
                start: "65% 100%",
                end: "100% 100%",
                scrub: true
            }
        });

        heavnMotion2.from(".sc-heavn .desc-2", {
            opacity: 0,
            duration: 0.3,
            onStart: () => {
                $(".sc-heavn .desc-2").removeClass("hide");
            },
            onReverseComplete: () => {
                $(".sc-heavn .desc-2").addClass("hide");
                $(".sc-heavn .title, .sc-heavn .desc").removeClass("hide").css("opacity", "1");
            }
        });
    })

    // sc-day
    dayMotion = gsap.timeline({
        onComplete: () => {
            if (window.innerWidth > 1200) clockMotion.restart();
        }
    });
    dayMotion
        .fromTo(".sc-day .sun-element", {
            scale: 80,
            opacity: 0.1,
        }, {
            scrollTrigger: {
                trigger: ".sc-day .sun-group",
                start: "0% 50%",
                end: "100% 40%",
                scrub: true,
                // markers: true,
                onUpdate: (e) => {
                    if (e.progress > 0.8) {
                        $(".sc-day .sun-element").css("opacity", 0)
                    } else {
                        $(".sc-day .sun-element").css("opacity", 1)
                    }
                }
            },
            scale: 1,
            opacity: 1,
        })
        .to(".sc-day .working-group", {
            scrollTrigger: {
                trigger: ".sc-revolutionize",
                start: "0% 100%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            y: 100
        })

    workingImgs = document.querySelectorAll(".sc-day .working-group .img-wrapper img");
    workingImgs.forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: "0% 50%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            y: -50,
        })
    });

    gsap.matchMedia().add("(min-width: 1201px)", function () {
        clockMotion = gsap.timeline({
            paused: true,
        })
        clockMotion
            .fromTo(".sc-day .working-group .clock", {
                yPercent: -12.5
            }, {
                scrollTrigger: {
                    trigger: ".sc-day .working-group",
                    start: "-10% 30%",
                    end: "10% 10%",
                    scrub: true,
                    // markers: true,
                },
                yPercent: 0
            })
            .to(".sc-day .clock", {
                scrollTrigger: {
                    trigger: ".sc-day .working-group",
                    start: "7.5% 0%",
                    end: "100% 100%",
                    scrub: true,
                    // markers: true,
                    onUpdate: (e) => {
                        if (e.progress > 0) {
                            $(".sc-day .working-group .clock .list-wrapper").css("opacity", 1)
                        } else {
                            $(".sc-day .working-group .clock .list-wrapper").css("opacity", 0)
                        }

                        if (e.progress >= 0.6) {
                            $(".sc-day .working-group .col").addClass("dark")
                            $(".sc-day .clock .clock-circle").addClass("dark")
                            $(".sc-day .clock li").addClass("dark")
                        } else {
                            $(".sc-day .working-group .col").removeClass("dark")
                            $(".sc-day .clock .clock-circle").removeClass("dark")
                            $(".sc-day .clock li").removeClass("dark")
                        }

                        index = Math.floor(e.progress * 16);
                        translate = `translateY(-${index * 100}%)`;

                        $(".sc-day .h1-list li").each(function (i) {
                            $(this).css("opacity", i === index ? 1 : 0);
                        });
                        $(".sc-day .h2-list li").each(function (i) {
                            $(this).css("opacity", i === index ? 1 : 0);
                        });

                        $(".sc-day .h1-list li").css("transform", translate)
                        $(".sc-day .h2-list li").css("transform", translate)
                    }
                }
            })
    })

    gsap.matchMedia().add("(min-width: 768px)", function () {
        dayMotion = gsap.timeline({});
        dayMotion
            .from(".sc-day .col", {
                scrollTrigger: {
                    trigger: ".sc-day .working-group",
                    start: "0% 0%",
                    end: "100% 100%",
                    scrub: true,
                    // markers: true,
                },
                y: -10
            })
    })

    gsap.matchMedia().add("(max-width: 767px)", function () {
        gsap.to(".sc-day .working-group", {
            scrollTrigger: {
                trigger: ".sc-day .working-group",
                start: "0% 0%",
                end: "100% 100%",
                scrub: true,
                // markers: true,
                onUpdate: (e) => {
                    if (e.progress >= 0.5) {
                        $(".sc-day .working-group .col").addClass("dark")
                    } else {
                        $(".sc-day .working-group .col").removeClass("dark")
                    }
                }
            }
        })
    })

    // sc-recommend
    recommendMotion = gsap.timeline({});
    recommendMotion
        .to(".sc-recommend .wrapper-1", {
            scrollTrigger: {
                trigger: ".sc-recommend .wrapper-1",
                start: "0% 100%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            y: -100
        })
        .to(".sc-recommend .text-group .title .char", {
            scrollTrigger: {
                trigger: ".sc-recommend .text-group",
                start: "0% 50%",
                end: "100% 100%",
                scrub: 1,
                // markers: true,
            },
            stagger: 0.1,
            color: "#000",
            ease: "power4.out",
        })

        .to(".sc-recommend .detail-group", {
            scrollTrigger: {
                trigger: ".sc-recommend .wrapper-2",
                start: "0% 100%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            y: 100
        })
        .to(".sc-recommend .wrapper-2", {
            scrollTrigger: {
                trigger: ".sc-order",
                start: "10% 100%",
                end: "100% 10%",
                scrub: true,
                // markers: true,
            },
            y: 150
        })

    gsap.matchMedia().add("(min-width: 768px)", function () {
        gsap.to(".head", {
            scrollTrigger: {
                trigger: ".detail-group",
                start: "0% 10%",
                end: "100% 100%",
                scrub: 1,
                onUpdate: (e) => {
                    if (e.progress >= 0.1) {
                        $(".sc-recommend .text-area .col-1").addClass("show");
                    } else {
                        $(".sc-recommend .text-area .col-1").removeClass("show");
                    }

                    if (e.progress >= 0.5) {
                        $(".sc-recommend .text-area .col-2").addClass("show");
                    } else {
                        $(".sc-recommend .text-area .col-2").removeClass("show");
                    }

                    if (e.progress >= 0.95) {
                        $(".sc-recommend .text-area").css("z-index", "10")
                    } else {
                        $(".sc-recommend .text-area").css("z-index", "0")
                    }
                }
            },
            rotation: -180,
            ease: "none"
        })
        gsap.to(".wipe", {
            scrollTrigger: {
                trigger: ".detail-group",
                start: "0% 10%",
                end: "100% 100%",
                scrub: 1
            },
            rotation: -180,
            ease: "none"
        })
    })

    // sc-revolutionize - lottie animation
    gsap.matchMedia().add("(min-width: 768px)", function () {
        function LottieScrollTrigger(vars) {
            let playhead = {
                    frame: 0
                },
                target = gsap.utils.toArray(vars.target)[0],
                speeds = {
                    slow: "+=2000",
                    medium: "+=1000",
                    fast: "+=500"
                },
                st = {
                    trigger: target,
                    pin: true,
                    start: "top top",
                    end: speeds[vars.speed] || "+=1000",
                    scrub: 1,
                },
                ctx = gsap.context && gsap.context(),

                animation = lottie.loadAnimation({
                    container: target,
                    renderer: vars.renderer || "svg",
                    loop: false,
                    autoplay: false,
                    path: vars.path,
                    rendererSettings: vars.rendererSettings || {
                        preserveAspectRatio: "xMidYMid slice",
                    },
                });
            for (let p in vars) {
                st[p] = vars[p];
            }
            animation.addEventListener("DOMLoaded", function () {
                let createTween = function () {
                    animation.frameTween = gsap.to(playhead, {
                        frame: animation.totalFrames - 1,
                        ease: "none",
                        onUpdate: () => animation.goToAndStop(playhead.frame, true),
                        scrollTrigger: st,
                    });
                    return () => animation.destroy && animation.destroy();
                };
                ctx && ctx.add ? ctx.add(createTween) : createTween();
                ScrollTrigger.sort();
                ScrollTrigger.refresh();
            });
            return animation;
        }

        LottieScrollTrigger({
            target: ".lottie",
            path: "https://wookjinc.github.io/heavn-one/assets/json/6705298bbfeb48ae73b996e3_data.json",
            speed: "medium",
            scrub: 2,
            pin: false,
            onUpdate: (e) => {
                if (e.progress > 0 && e.progress <= 0.25) {
                    $(".text-1").addClass("show").siblings().removeClass("show");
                } else if (e.progress > 0.25 && e.progress <= 0.5) {
                    $(".text-2").addClass("show").siblings().removeClass("show");
                } else if (e.progress > 0.5 && e.progress <= 0.75) {
                    $(".text-3").addClass("show").siblings().removeClass("show");
                } else {
                    $(".text-4").addClass("show").siblings().removeClass("show");
                }
            },
        });
    })
})