// Dashboard Modal Implementation

document.addEventListener('DOMContentLoaded', function() {
    // Create modal container for Adventure Works dashboard
    const adventureWorksModal = document.createElement('div');
    adventureWorksModal.id = 'dashboard-modal';
    adventureWorksModal.className = 'modal';
    adventureWorksModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Adventure Works: Sales Analysis</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="dashboard-container">
                    <iframe title="Dashboard" width="100%" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZGI4Nzg1ZWItODZmNi00ZDMyLThmOTEtNjIxMDdmYTdmNDY0IiwidCI6ImRkNjAxZTBiLWZmMTktNGI1Mi1iNzUxLWZjMWUyMjMwNDJhNyJ9" frameborder="0" allowFullScreen="true"></iframe>
                    <p class="dashboard-note">This dashboard allows you to explore Adventure Works sales data.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(adventureWorksModal);
    
    // Create modal container for Fast Food Giants dashboard
    const fastFoodModal = document.createElement('div');
    fastFoodModal.id = 'fast-food-dashboard-modal';
    fastFoodModal.className = 'modal';
    fastFoodModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Top Fast Food Giants: Stock Analysis</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="dashboard-container">
                    <iframe title="Trend Trackers" width="100%" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiNzNhYmEzMTctZDNiZS00NTc0LWFlOWMtMGZlMDhlMGMwMWIzIiwidCI6ImRkNjAxZTBiLWZmMTktNGI1Mi1iNzUxLWZjMWUyMjMwNDJhNyJ9" frameborder="0" allowFullScreen="true"></iframe>
                    <p class="dashboard-note">This dashboard showcases stock analysis for top fast food companies.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(fastFoodModal);
    
    // Create modal container for End-to-End Sales Data Analysis dashboard
    const salesDataModal = document.createElement('div');
    salesDataModal.id = 'sales-data-dashboard-modal';
    salesDataModal.className = 'modal';
    salesDataModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>End-to-End Sales Data Analysis</h2>
                <span class="close-modal">&times;</span>
            </div>
            <div class="modal-body">
                <div class="dashboard-container">
                    <iframe title="Hackathon - 1002" width="100%" height="600" src="https://app.powerbi.com/view?r=eyJrIjoiZGZkNTM5MWUtYWVhNy00ZjJkLTg3OWItNzFjNjRhODA0MGI5IiwidCI6ImRkNjAxZTBiLWZmMTktNGI1Mi1iNzUxLWZjMWUyMjMwNDJhNyJ9" frameborder="0" allowFullScreen="true"></iframe>
                    <p class="dashboard-note">This dashboard presents comprehensive sales data analysis with predictive modeling insights.</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(salesDataModal);

    // Add event listener to open Adventure Works dashboard modal
    const openDashboardBtn = document.getElementById('open-dashboard-btn');
    if (openDashboardBtn) {
        openDashboardBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show the Adventure Works dashboard modal
            document.getElementById('dashboard-modal').style.display = 'block';
        });
    }
    
    // Add event listeners to open Fast Food & Sales Data dashboard modals
    const openSalesDataBtns = document.querySelectorAll('#open-sales-data-btn');
    openSalesDataBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Determine which project card this button belongs to
            const projectCard = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            
            if (projectTitle.includes('Fast Food Giants')) {
                // Show the Fast Food dashboard modal
                document.getElementById('fast-food-dashboard-modal').style.display = 'block';
            } else if (projectTitle.includes('End-to-End Sales Data')) {
                // Show the Sales Data Analysis dashboard modal
                document.getElementById('sales-data-dashboard-modal').style.display = 'block';
            }
        });
    });
    
    // No GitHub buttons needed as we're embedding the dashboard directly
    // The addGitHubDashboardButton function has been removed as per requirements
    
    // Function to open GitHub-hosted Power BI dashboard
    function openPowerBIFile() {
        // Create a modal to display the GitHub-hosted dashboard
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Power BI Dashboard from GitHub</h2>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <div class="dashboard-container">
                        <div class="github-dashboard-view">
                            <h3>Pattern Seekers Dashboard</h3>
                            <p>This dashboard is hosted on GitHub. You have several options to view it:</p>
                            
                            <div class="dashboard-options">
                                <div class="dashboard-option">
                                    <i class="fab fa-github option-icon"></i>
                                    <h4>View on GitHub</h4>
                                    <p>Access the dashboard file directly on GitHub repository</p>
                                    <a href="https://github.com/gitimaad/Pattern-Seekers/blob/1de0107b05faabaf17bfb170498cc46278f7bb8b/Dashboard.pbix" target="_blank" class="option-btn">Open on GitHub</a>
                                </div>
                                
                                <div class="dashboard-option">
                                    <i class="fas fa-cloud-download-alt option-icon"></i>
                                    <h4>Download & View</h4>
                                    <p>Download the PBIX file and open it with Power BI Desktop</p>
                                    <a href="https://github.com/gitimaad/Pattern-Seekers/raw/1de0107b05faabaf17bfb170498cc46278f7bb8b/Dashboard.pbix" class="option-btn">Download PBIX</a>
                                </div>
                                
                                <div class="dashboard-option">
                                    <i class="fas fa-desktop option-icon"></i>
                                    <h4>Online Viewer</h4>
                                    <p>Use Microsoft's Power BI service to view the dashboard online</p>
                                    <a href="https://app.powerbi.com/view?r=eyJrIjoiZTQ4ZTY5ZGItYmM5Ni00YmFhLWE1YTQtNGJiNGY1ZWJhZDRiIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9" target="_blank" class="option-btn">Open Online Viewer</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add event listener to close the modal
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                // Remove the modal from DOM after closing
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            });
        }
        
        // Close modal when clicking outside of modal content
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                // Remove the modal from DOM after closing
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // Add styles for the new elements
        const style = document.createElement('style');
        style.textContent = `
            .github-dashboard-view {
                padding: 20px;
                background-color: #222;
                border-radius: 5px;
                color: #eee;
                text-align: center;
            }
            .dashboard-options {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 20px;
                margin-top: 25px;
            }
            .dashboard-option {
                flex: 1;
                min-width: 250px;
                max-width: 300px;
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                transition: transform 0.3s, box-shadow 0.3s;
            }
            .dashboard-option:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0, 102, 204, 0.3);
            }
            .option-icon {
                font-size: 2.5rem;
                color: #0066cc;
                margin-bottom: 15px;
            }
            .dashboard-option h4 {
                margin: 10px 0;
                font-size: 1.2rem;
            }
            .dashboard-option p {
                margin-bottom: 20px;
                font-size: 0.9rem;
                color: #aaa;
            }
            .option-btn {
                display: inline-block;
                padding: 8px 16px;
                background-color: #0066cc;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                transition: background-color 0.3s;
            }
            .option-btn:hover {
                background-color: #0055aa;
            }
            .github-button-container {
                display: flex;
                justify-content: center;
                margin: 20px 0;
                padding: 10px;
                background-color: rgba(0, 0, 0, 0.2);
                border-radius: 6px;
                border: 1px solid #444;
            }
            .github-dashboard-btn {
                display: block;
                padding: 12px 24px;
                background-color: #333;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                text-align: center;
                transition: all 0.3s ease;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                font-weight: bold;
            }
            .github-dashboard-btn:hover {
                background-color: #0066cc;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 102, 204, 0.4);
            }
            .github-link {
                display: inline-block;
                margin-top: 10px;
                padding: 10px 20px;
                background-color: #333;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                transition: all 0.3s ease;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
                font-weight: bold;
            }
            .github-link:hover {
                background-color: #0066cc;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 102, 204, 0.4);
            }
        `;
        document.head.appendChild(style);
    }


    // Add event listeners to close modals
    const closeModalBtns = document.querySelectorAll('.close-modal');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });

    // Close modal when clicking outside of modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
    
    // Function to check if iframes have loaded properly
    function checkIframeLoading() {
        const iframes = document.querySelectorAll('.dashboard-container iframe');
        
        iframes.forEach(iframe => {
            // Add load event listener to each iframe
            iframe.addEventListener('load', function() {
                console.log('Dashboard iframe loaded successfully');
                // Keep fallback visible as an alternative option
                const fallbackEl = iframe.parentNode.querySelector('.dashboard-fallback');
                if (fallbackEl) {
                    // We're keeping the fallback visible as an alternative option
                    fallbackEl.style.display = 'block';
                }
            });
            
            // Add error handling
            iframe.addEventListener('error', function() {
                console.error('Error loading dashboard iframe');
                // Show fallback message if it exists
                const fallbackEl = iframe.parentNode.querySelector('.dashboard-fallback');
                if (fallbackEl) {
                    fallbackEl.style.display = 'block';
                }
            });
        });
    }
    
    // Add loading spinner styles
    const spinnerStyles = document.createElement('style');
    spinnerStyles.textContent = `
        .dashboard-loading {
            text-align: center;
            padding: 40px 20px;
            color: #eee;
        }
        .spinner {
            margin: 20px auto;
            width: 50px;
            height: 50px;
            border: 5px solid rgba(0, 102, 204, 0.2);
            border-radius: 50%;
            border-top-color: #0066cc;
            animation: spin 1s ease-in-out infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyles);
    
    // No need for script loading function as we've removed chart functionality
});