import Airtable from 'airtable'

export class Table {
  constructor(table) {
    this.base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID
    )
    this.table = this.base(table)
  }

  async getAllData() {
    const records = await this.table.select({}).all()
    const minifiedRecords = await this.minifiedRecords(records)
    return minifiedRecords.filter((o) => o.Status)
  }

  minifiedRecords(records) {
    return records.map((record) => this.minifyRecord(record))
  }

  minifyRecord(record) {
    return {
      id: record.id,
      ...record.fields
    }
  }
}

export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}