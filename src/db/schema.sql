-- 5. Shivir
CREATE TABLE shivirs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  occasion TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  city TEXT,
  address TEXT,
  map_link TEXT
);

-- 1. Satsangis
CREATE TABLE satsangis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER,
  city TEXT,
  state TEXT,
  birthdate DATE,
  panno TEXT,
  address TEXT,
  mobile TEXT,
  email TEXT,
  preference_ids TEXT[], -- array of preference identifiers
  room_allocation_type TEXT,
  seva_payment_status BOOLEAN DEFAULT FALSE,
  is_seva_waived BOOLEAN DEFAULT FALSE
);

-- 2. Room Properties
CREATE TABLE room_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shivir_id UUID REFERENCES shivirs(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  map_link TEXT,
  city TEXT,
  state TEXT,
  pin TEXT
);

-- 3. Room Types
CREATE TABLE room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  capacity INTEGER,
  type_name TEXT
);

-- 4. Rooms
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES room_properties(id) ON DELETE CASCADE,
  room_type_id UUID REFERENCES room_types(id) ON DELETE SET NULL,
  room_no TEXT,
  floor INTEGER,
  status TEXT -- E.g., 'available', 'occupied', 'maintenance'
);



-- 6. Allocation (who gets which room in which shivir)
CREATE TABLE allocations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shivir_id UUID REFERENCES shivirs(id) ON DELETE CASCADE,
  satsangi_id UUID REFERENCES satsangis(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE SET NULL
);

-- 7. Checked-In
CREATE TABLE checked_in (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shivir_id UUID REFERENCES shivirs(id) ON DELETE CASCADE,
  satsangi_id UUID REFERENCES satsangis(id) ON DELETE CASCADE,
  time TIME,
  date DATE
);

-- 8. Checked-Out
CREATE TABLE checked_out (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shivir_id UUID REFERENCES shivirs(id) ON DELETE CASCADE,
  satsangi_id UUID REFERENCES satsangis(id) ON DELETE CASCADE,
  time TIME,
  date DATE
);