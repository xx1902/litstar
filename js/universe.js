function dark() {
    // Polyfill for requestAnimationFrame for better performance
    window.requestAnimationFrame = 
        window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;

    var n, e, i, h, 
        t = 0.05, 
        s = document.getElementById("universe"), 
        o = true, 
        a = "180,184,240", 
        r = "226,225,142", 
        d = "226,225,224", 
        c = [];

    // Function to set canvas dimensions
    function f() {
        n = window.innerWidth;
        e = window.innerHeight;
        i = 0.216 * n;
        s.setAttribute("width", n);
        s.setAttribute("height", e);
    }

    // Function to update and draw particles
    function u() {
        h.clearRect(0, 0, n, e);
        for (var t = c.length, i = 0; i < t; i++) {
            var s = c[i];
            s.move();
            s.fadeIn();
            s.fadeOut();
            s.draw();
        }
    }

    // Particle constructor
    function y() {
        this.reset = function() {
            this.giant = m(3);
            this.comet = !this.giant && !o && m(10);
            this.x = l(0, n - 10);
            this.y = l(0, e);
            this.r = l(1.1, 2.6);
            this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t;
            this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120);
            this.fadingOut = null;
            this.fadingIn = true;
            this.opacity = 0;
            this.opacityTresh = l(0.2, 1 - 0.4 * (this.comet + 1 - 1));
            this.do = l(5e-4, .002) + 0.001 * (this.comet + 1 - 1);
        };

        // Fade in effect
        this.fadeIn = function() {
            if (this.fadingIn) {
                this.fadingIn = !(this.opacity > this.opacityTresh);
                this.opacity += this.do;
            }
        };

        // Fade out effect
        this.fadeOut = function() {
            if (this.fadingOut) {
                this.fadingOut = !(this.opacity < 0);
                this.opacity -= this.do / 2;
                if (this.x > n || this.y < 0) {
                    this.fadingOut = false;
                    this.reset();
                }
            }
        };

        // Draw the particle
        this.draw = function() {
            h.beginPath();
            if (this.giant) {
                h.fillStyle = "rgba(" + a + "," + this.opacity + ")";
                h.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
            } else if (this.comet) {
                h.fillStyle = "rgba(" + d + "," + this.opacity + ")";
                h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, false);
                for (var t = 0; t < 30; t++) {
                    h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")";
                    h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2);
                    h.fill();
                }
            } else {
                h.fillStyle = "rgba(" + r + "," + this.opacity + ")";
                h.rect(this.x, this.y, this.r, this.r);
            }
            h.closePath();
            h.fill();
        };

        // Move the particle
        this.move = function() {
            this.x += this.dx;
            this.y += this.dy;
            if (!this.fadingOut) {
                this.reset();
            }
            if (this.x > n - n / 4 || this.y < 0) {
                this.fadingOut = true;
            }
        };

        // Delay to allow for comet creation
        setTimeout(function() { o = false; }, 50);
    }

    // Random number generation functions
    function m(t) {
        return Math.floor(1000 * Math.random()) + 1 < 10 * t;
    }

    function l(t, i) {
        return Math.random() * (i - t) + t;
    }

    // Initialize canvas dimensions and particles
    f();
    window.addEventListener("resize", f, false);

    // Create particles and start animation loop
    (function() {
        h = s.getContext("2d");
        for (var t = 0; t < i; t++) {
            c[t] = new y();
            c[t].reset();
        }
        
        u(); // Initial draw
    })();

    // Animation loop
    (function t() {
        if (document.getElementsByTagName('html')[0].getAttribute('data-theme') === 'dark') {
            u(); // Update and draw particles if the theme is dark
        }
        
        window.requestAnimationFrame(t); // Request next frame
    })();
}

// Call the dark function to start the animation
dark();