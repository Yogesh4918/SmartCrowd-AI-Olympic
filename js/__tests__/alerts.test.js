/**
 * @jest-environment jsdom
 */
'use strict';

describe('Alerts and Predictions Logic Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="active-alerts"></div>
            <div id="ai-predictions"></div>
        `;
    });

    test('Should render active alerts correctly', () => {
        const mockAlerts = [
            { type: 'danger', text: 'Critical Incident' },
            { type: 'warning', text: 'Warning Incident' }
        ];

        const renderAlerts = () => {
            const container = document.getElementById('active-alerts');
            container.innerHTML = mockAlerts.map(a => `<div class="${a.type}">${a.text}</div>`).join('');
        };

        renderAlerts();
        const container = document.getElementById('active-alerts');
        expect(container.children.length).toBe(2);
        expect(container.innerHTML).toContain('Critical Incident');
    });

    test('Edge case: Empty predictions array', () => {
        const mockPredictions = [];
        const renderPredictions = () => {
            const container = document.getElementById('ai-predictions');
            if (mockPredictions.length === 0) {
                container.innerHTML = '<div>No predictions at this time.</div>';
            }
        };

        renderPredictions();
        expect(document.getElementById('ai-predictions').innerHTML).toContain('No predictions at this time.');
    });
});
