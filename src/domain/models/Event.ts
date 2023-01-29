import validator from 'validator';
import { UUID, Date } from '../../types';

export class Event {
	private _publishedAt: Date;

	constructor(
		private _id: UUID,
		private _title: string,
		private _description: string,
		private _date: Date,
		private _city: string
	) {
		if (_id.length !== 36) {
			throw new Error('Id must be a valid uuid');
		}

		if (_title.length <= 5) {
			throw new Error('Title must be at least 5 characters long');
		}

		if (_city.length === 0) {
			throw new Error('City must not be empty');
		}

		if (_description.length <= 10) {
			throw new Error('Description must be at least 10 characters long');
		}

		if (!validator.isDate(_date, { format: 'YYYY-MM-DD' })) {
			throw new Error('Date must be a valid date');
		}

		this._publishedAt = '2022-01-01';
	}

	static MarshallFromRepository(
		id: UUID,
		title: string,
		description: string,
		date: Date,
		publishedAt: Date,
		city: string
	): Event {
		const e = new Event(id, title, description, date, city);
		e._publishedAt = publishedAt;
		return e;
	}

	id() {
		return this._id;
	}

	title() {
		return this._title;
	}

	description() {
		return this._description;
	}

	date() {
		return this._date;
	}

	publishedAt() {
		return this._publishedAt;
	}

	city() {
		return this._city;
	}
}
