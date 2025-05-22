// This is a conceptual schema – not tied to an ORM
// You can use this as the base to create SQL migrations

export type Satsangi = {
  id: string
  name: string
  age: number
  city: string
  state: string
  birthdate: Date
  panNo: string
  address: string
  mobile: string
  email: string
  preferenceIds: string[] // could be foreign keys later
  roomAllocationType: string
  sevaPaymentStatus: boolean
  isSevaWaived: boolean
}

export type RoomProperty = {
  id: string
  shivirId: string
  name: string
  address: string
  mapLink: string
  city: string
  state: string
  pin: string
}

export type RoomType = {
  id: string
  name: string
  capacity: number
  typeName: string
}

export type Room = {
  id: string
  propertyId: string // foreign key to RoomProperty
  roomTypeId: string // foreign key to RoomType
  roomNo: string
  floor: number
  status: string // maybe "available", "occupied", "maintenance"
}

export type Allocation = {
  id: string
  shivirId: string
  satsangiId: string
  roomId: string
}

export type Shivir = {
  id: string
  occasion: string
  startDate: Date
  endDate: Date
  city: string
  address: string
  mapLink: string
}

export type CheckedIn = {
  shivirId: string
  satsangiId: string
  time: string
  date: Date
}

export type CheckedOut = {
  shivirId: string
  satsangiId: string
  time: string
  date: Date
}