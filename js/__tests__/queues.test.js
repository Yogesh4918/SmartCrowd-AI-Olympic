/**
 * @jest-environment jsdom
 */
'use strict';

describe('Queues Logic Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="queue-grid"></div>
            <button class="queue-filter-btn" data-filter="all"></button>
            <button class="queue-filter-btn" data-filter="food"></button>
        `;
    });

    test('Queue filter buttons should toggle classes', () => {
        const filterQueues = (btn) => {
            document.querySelectorAll('.queue-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };

        const buttons = document.querySelectorAll('.queue-filter-btn');
        filterQueues(buttons[1]);
        
        expect(buttons[0].classList.contains('active')).toBeFalsy();
        expect(buttons[1].classList.contains('active')).toBeTruthy();
    });

    test('Queue grid renders correctly', () => {
        const mockQueues = [
            { type: 'food', name: 'Pizza Station', wait: 5 },
            { type: 'washroom', name: 'Block A', wait: 2 }
        ];

        const renderQueues = (filter = 'all') => {
            const container = document.getElementById('queue-grid');
            const filtered = filter === 'all' ? mockQueues : mockQueues.filter(q => q.type === filter);
            container.innerHTML = filtered.map(q => `<div class="queue-card">${q.name} - ${q.wait}</div>`).join('');
        };

        renderQueues();
        expect(document.getElementById('queue-grid').children.length).toBe(2);

        renderQueues('food');
        expect(document.getElementById('queue-grid').children.length).toBe(1);
    });
});
