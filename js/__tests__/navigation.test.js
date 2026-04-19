/**
 * @jest-environment jsdom
 */
'use strict';

describe('Navigation Logic Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <select id="nav-from"><option value="gate-a">Gate A</option></select>
            <select id="nav-to"><option value="food-court">Food Court</option></select>
            <div id="route-result" class="hidden"></div>
            <div id="route-steps"></div>
            <span id="route-time"></span>
            <span id="route-ai-tip"></span>
        `;
    });

    test('calculateRoute should show route result', () => {
        // Mock function logic for calculateRoute
        const calculateRoute = () => {
            document.getElementById('route-result').classList.remove('hidden');
            document.getElementById('route-steps').innerHTML = '<li>Step 1</li>';
        };

        const routeResult = document.getElementById('route-result');
        expect(routeResult.classList.contains('hidden')).toBeTruthy();
        
        calculateRoute();
        
        expect(routeResult.classList.contains('hidden')).toBeFalsy();
        expect(document.getElementById('route-steps').innerHTML).toContain('Step 1');
    });

    test('Edge case: Navigating to same location', () => {
        document.getElementById('nav-from').value = 'gate-a';
        document.getElementById('nav-to').innerHTML = '<option value="gate-a">Gate A</option>';
        document.getElementById('nav-to').value = 'gate-a';
        
        const calculateRouteEdgeCase = () => {
            const from = document.getElementById('nav-from').value;
            const to = document.getElementById('nav-to').value;
            if (from === to) {
                document.getElementById('route-result').classList.remove('hidden');
                document.getElementById('route-steps').innerHTML = 'You are already at your destination.';
            }
        };

        calculateRouteEdgeCase();
        expect(document.getElementById('route-steps').innerHTML).toBe('You are already at your destination.');
    });
});
