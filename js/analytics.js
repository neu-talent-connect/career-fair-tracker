// Analytics - visualize application pipeline with Sankey chart

// Load Google Charts library
google.charts.load('current', {'packages':['sankey']});

// Calculate stats for pipeline visualization
function calculatePipelineStats() {
    const total = data.jobs.length;
    
    // Count by status
    const submitted = data.jobs.filter(j => 
        j.status === 'Submitted' || 
        j.status === 'Under Review' || 
        j.status === 'Interview' || 
        j.status === 'Rejected' || 
        j.status === 'Offer'
    ).length;
    
    const interviewed = data.jobs.filter(j => 
        j.status === 'Interview' || j.status === 'Offer'
    ).length;
    
    const offers = data.jobs.filter(j => j.status === 'Offer').length;
    
    const rejected = data.jobs.filter(j => j.status === 'Rejected').length;
    
    // Calculate no response (submitted more than 2 weeks ago with no further status)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    
    const noResponse = data.jobs.filter(job => 
        (job.status === 'Submitted' || job.status === 'Under Review') &&
        job.dateApplied && 
        new Date(job.dateApplied) < twoWeeksAgo
    ).length;
    
    // Post-interview rejections
    const postInterviewRejected = data.jobs.filter(j => 
        j.status === 'Rejected' && 
        data.interviews.some(i => i.company === j.company && i.position === j.title)
    ).length;
    
    return {
        total,
        submitted,
        interviewed,
        offers,
        rejected,
        noResponse,
        postInterviewRejected,
        stillPending: submitted - interviewed - rejected - noResponse
    };
}

// Draw the Sankey flow chart
function drawSankeyChart() {
    const stats = calculatePipelineStats();
    
    if (stats.total === 0) {
        document.getElementById('sankeyChart').innerHTML = 
            '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; text-align: center; flex-direction: column; gap: 12px;">' +
            '<div style="font-size: 48px;">📊</div>' +
            '<div style="font-size: 16px; font-weight: 500;">No data yet</div>' +
            '<div style="font-size: 14px;">Add some job applications to see your pipeline analytics!</div>' +
            '</div>';
        
        // Clear metrics
        document.getElementById('interviewRate').textContent = '0%';
        document.getElementById('offerRate').textContent = '0%';
        document.getElementById('responseRate').textContent = '0%';
        return;
    }
    
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'From');
    dataTable.addColumn('string', 'To');
    dataTable.addColumn('number', 'Count');
    
    // Build the flow with numbers in labels - only add rows with count > 0
    const rows = [];
    
    // Calculate totals for each node to display in labels
    const interviewsWithoutOffers = stats.interviewed - stats.offers;
    
    // Create labels with numbers
    const applicationsLabel = `${stats.total}\nApplications`;
    const interviewsLabel = `${stats.interviewed}\nInterviews`;
    const rejectedLabel = `${stats.rejected}\nRejected`;
    const noResponseLabel = `${stats.noResponse}\nNo Response`;
    const pendingLabel = `${stats.stillPending}\nPending`;
    const offersLabel = `${stats.offers}\nOffers`;
    const postInterviewRejectedLabel = `${interviewsWithoutOffers}\nNo Offer`;
    
    if (stats.interviewed > 0) {
        rows.push([applicationsLabel, interviewsLabel, stats.interviewed]);
    }
    
    if (stats.rejected > 0) {
        rows.push([applicationsLabel, rejectedLabel, stats.rejected]);
    }
    
    if (stats.noResponse > 0) {
        rows.push([applicationsLabel, noResponseLabel, stats.noResponse]);
    }
    
    if (stats.stillPending > 0) {
        rows.push([applicationsLabel, pendingLabel, stats.stillPending]);
    }
    
    if (stats.offers > 0) {
        rows.push([interviewsLabel, offersLabel, stats.offers]);
    }
    
    if (interviewsWithoutOffers > 0) {
        rows.push([interviewsLabel, postInterviewRejectedLabel, interviewsWithoutOffers]);
    }
    
    dataTable.addRows(rows);
    
    // Sankey chart options
    const options = {
        height: 500,
        sankey: {
            node: {
                colors: ['#C8102E', '#4A90E2', '#50C878', '#E74C3C', '#95A5A6', '#F39C12', '#9B59B6'],
                label: {
                    fontName: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: 16,
                    color: '#000',
                    bold: false
                },
                nodePadding: 40,
                width: 20,
                interactivity: true
            },
            link: {
                colorMode: 'gradient',
                colors: ['#C8102E', '#4A90E2', '#50C878', '#E74C3C', '#95A5A6', '#F39C12']
            }
        },
        tooltip: {
            isHtml: false,
            textStyle: {
                fontName: 'Inter, -apple-system, sans-serif',
                fontSize: 14
            }
        }
    };
    
    const chart = new google.visualization.Sankey(document.getElementById('sankeyChart'));
    chart.draw(dataTable, options);
    
    // Update metrics
    const interviewRate = stats.total > 0 ? ((stats.interviewed / stats.total) * 100).toFixed(1) : 0;
    const offerRate = stats.interviewed > 0 ? ((stats.offers / stats.interviewed) * 100).toFixed(1) : 0;
    const responseRate = stats.total > 0 ? (((stats.total - stats.noResponse) / stats.total) * 100).toFixed(1) : 0;
    
    document.getElementById('interviewRate').textContent = `${interviewRate}%`;
    document.getElementById('offerRate').textContent = `${offerRate}%`;
    document.getElementById('responseRate').textContent = `${responseRate}%`;
}

// Open analytics modal
function showAnalytics() {
    const modal = document.getElementById('analyticsModal');
    modal.style.display = 'flex';
    
    // Draw chart after modal is visible
    setTimeout(() => {
        google.charts.setOnLoadCallback(drawSankeyChart);
    }, 100);
}

// Close analytics modal
function closeAnalytics() {
    document.getElementById('analyticsModal').style.display = 'none';
}

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('analyticsModal');
    const modalContent = modal?.querySelector('.modal-content');
    
    if (event.target === modal) {
        closeAnalytics();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('analyticsModal');
        if (modal && modal.style.display === 'flex') {
            closeAnalytics();
        }
    }
});

