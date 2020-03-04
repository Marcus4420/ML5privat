
      // Menu-toggle button

      $(document).ready(function () {
            $(".menu-icon").on("click", function () {
                  $("nav ul").toggleClass("showing");
            });
      });
      
      function scrollChange() {
            var y = window.scrollY;
            var ul = document.getElementById('menubar');
            ul.style.backgroundColor = 'hsla('+y*100/360/2+', 100%, 50%, 1)';
            if (y<=0) {
                  ul.style.backgroundColor = 'white';
            }
      }
