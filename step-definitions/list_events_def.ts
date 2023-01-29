import { Given, When, Then, Before } from '@cucumber/cucumber';
import { expect } from 'chai';
import { api } from '../src/domain/services/event-service';
import { InMemoryEvents } from '../src/infrastructure/databases/InMemoryEvents';
import { Event } from '../src/domain/models/Event';

Before(function () {
	this.Repository = new InMemoryEvents();
	this.Store = api(this.Repository);
});

Given('a member', async function () {});

Given('there are published events', function () {
	this.expectedEvents = [
		new Event(
			'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
			'Event 1',
			'Event 1 description',
			'2022-01-01',
			'reims'
		),
	];
	this.Repository.setEvents(this.expectedEvents);
});

When('the member visits the events page', async function () {
	this.eventsResult = await this.Store.listEvents();
});

Then('he must see all the published events', async function () {
	expect(this.eventsResult).to.equal(this.expectedEvents);
});

Given(
	'there are published events in {word}',
	async function (cityName: string) {
		this.expectedEvents = [
			new Event(
				'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
				'Event 1',
				'Event 1 description',
				'2020-01-01',
				cityName
			),
			new Event(
				'2b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd2bed',
				'Event 2',
				'Event 2 description',
				'2020-01-01',
				'paris'
			),
		];
		this.Repository.setEvents(this.expectedEvents);
	}
);

When(
	'the member search for events in {word}',
	async function (cityName: string) {
		this.eventsResult = await this.Store.listEvents({
			city: cityName,
		});
	}
);

Then('he must see all the published events in {word}', async function (cityName: string) {
	expect(this.eventsResult).to.equal(this.expectedEvents);
	expect(
		this.eventsResult.some((event: Event) => event.city() === cityName)
	).to.equal(true);

});
