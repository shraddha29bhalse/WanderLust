// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener(
        "submit",
        (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add("was-validated");
      }, 
      false
    );
    });
  })();

  
function toggleIcons() {
    const iconContainer = document.querySelector('.category-icons');
    const expandBtn = document.querySelector('.expand-btn');
    
    iconContainer.classList.toggle('expanded');
    
    if (iconContainer.classList.contains('expanded')) {
        expandBtn.textContent = 'Show Less';
    } else {
        expandBtn.textContent = 'Show More';
    }
}

