// Open sidebar (mobile)
document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('overlay').style.display = 'block';
});

// Close sidebar
document.getElementById('closeSidebar').addEventListener('click', closeMenu);
document.getElementById('overlay').addEventListener('click', closeMenu);

function closeMenu() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').style.display = 'none';
}

function openFile(path) {
  const frame = document.getElementById('contentFrame');
  const loading = document.getElementById('loading');
  console.log("Loading:", path);

  if (!frame || !path) {
    console.warn("Iframe or path missing");
    return;
  }

  // Show loading indicator
  loading.style.display = 'block';
  frame.style.display = 'none';

  // Small delay so user sees loading (optional but nicer UX)
  setTimeout(() => {
    frame.src = path;

    // Hide loading once iframe starts loading
    frame.onload = () => {
      loading.style.display = 'none';
      frame.style.display = 'block';
    };

    // Fallback: hide loading after ~8 seconds even if something fails
    setTimeout(() => {
      if (loading.style.display !== 'none') {
        loading.style.display = 'none';
        frame.style.display = 'block';
      }
    }, 8000);
  }, 300);

  // Close mobile menu after selection
  if (window.innerWidth <= 820) {
    closeMenu();
  }
}

// ==================== CLEAN FOLDER TOGGLE - FIXED VERSION ====================
document.addEventListener('DOMContentLoaded', () => {

    console.log("Folder toggle script loaded"); // For debugging

    const titles = document.querySelectorAll('.section-title');

    titles.forEach(title => {
        // Remove any old listeners first (prevents double firing)
        title.removeEventListener('click', title.clickHandler);
        
        title.clickHandler = function(e) {
            e.stopImmediatePropagation(); // Prevent conflicts

            const content = this.nextElementSibling;

            if (content && content.classList.contains('section-content')) {
                const willOpen = !content.classList.contains('open');

                // Toggle current folder
                content.classList.toggle('open');
                this.classList.toggle('open');

                console.log(`Toggled: ${this.textContent.trim()} → ${willOpen ? 'OPEN' : 'CLOSED'}`);
            }
        };

        title.addEventListener('click', title.clickHandler);
    });

    setTimeout(() => {
        const mainFolders = document.querySelectorAll('.section-title');
        mainFolders.forEach(title => {
            if (title.textContent.includes('Tournaments2') || 
                title.textContent.includes('RECENT Tournaments3')) {
                const content = title.nextElementSibling;
                if (content) {
                    content.classList.add('open');
                    title.classList.add('open');
                }
            }
        });
    }, 300);

});

window.openFolder = function(folderName) {
  console.log("OPEN:", folderName);

  const title = document.querySelector(
    `#sidebar .section-title[data-folder="${folderName}"]`
  );

  if (!title) {
    console.warn("Folder not found:", folderName);
    return false;
  }

  const content = title.nextElementSibling;
  if (content && !content.classList.contains('open')) {
    title.click();
  }

  return true;
};

// ==================== SEARCH FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('sidebarSearch');
    if (!searchInput) return;

    const allLinks = document.querySelectorAll('.sidebar a, .section-title');

    function filterSidebar() {
        const term = searchInput.value.toLowerCase().trim();

        allLinks.forEach(item => {
            const text = item.textContent.toLowerCase();
            const parentSection = item.closest('.section');

            if (text.includes(term) || term === '') {
                item.style.display = 'block';
                if (parentSection) parentSection.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Auto-expand folders that have matches
        document.querySelectorAll('.section-content').forEach(content => {
            const hasVisible = Array.from(content.querySelectorAll('a')).some(a => a.style.display !== 'none');
            if (hasVisible && term !== '') {
                content.classList.add('open');
                content.previousElementSibling.classList.add('open');
            }
        });
    }

    searchInput.addEventListener('input', filterSidebar);
});

  window.addEventListener('load', () => {
    openFile('html/WC-w2026/Winter-2026-CETC.html');   
  });
