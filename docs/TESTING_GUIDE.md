# Database & Event Creation Testing Guide

## 🗄️ Database Setup

### Option 1: Using Docker (Recommended)
```bash
# Start PostgreSQL container
docker run -d --name gatherly-postgres \
  -p 5432:5432 \
  -e POSTGRES_DB=gatherly_db \
  -e POSTGRES_USER=gatherly_user \
  -e POSTGRES_PASSWORD=gatherly_pass \
  postgres:15

# Wait for container to start
sleep 5

# Run database migrations
npm run db:migrate
```

### Option 2: Using Local PostgreSQL
```bash
# Create database and user
psql -c "CREATE DATABASE gatherly_db;"
psql -c "CREATE USER gatherly_user WITH PASSWORD 'gatherly_pass';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE gatherly_db TO gatherly_user;"

# Run database migrations
npm run db:migrate
```

## 🧪 Testing Steps

### 1. Test Database Connection
```bash
# Run the database test script
npx tsx scripts/test-db.ts
```

**Expected Output:**
```
🔍 Testing database connection...
✅ Database connection successful!
📊 Found 0 existing events in database

🧪 Testing event creation...
✅ Test event created successfully!
📝 Event ID: [UUID]
📅 Event Name: Test Event - [timestamp]
🏢 Organization ID: test-org-[timestamp]
✅ Test event fetched successfully!
📖 Fetched event name: Test Event - [timestamp]
🧹 Test event cleaned up

🎉 All database tests passed!
💾 Database is ready for event creation!
```

### 2. Test Event Creation via UI

#### Step 2.1: Start Development Server
```bash
npm run dev
```

#### Step 2.2: Navigate to Dashboard
1. Open http://localhost:3000
2. Click "Sign In" 
3. Create account or sign in
4. Navigate to http://localhost:3000/dashboard

#### Step 2.3: Test Event Creation Modal
1. Click "Create Event" button in dashboard
2. Fill out Step 1 (Event Details):
   - Event Name: "Test Conference 2025"
   - Description: "A test event for validation"
   - Date: Select future date
   - Location: "Jakarta Convention Center"
   - Upload poster (optional)

3. Click "Next" to Step 2 (Ticket Configuration):
   - Add ticket type: "Early Bird"
   - Price: 150000 (IDR)
   - Quantity: 100
   - Add another type: "Regular"
   - Price: 200000 (IDR)
   - Quantity: 200

4. Click "Next" to Step 3 (Publication):
   - Event URL: Auto-generated slug
   - Status: "Draft" or "Published"
   - Agree to terms

5. Click "Create Event"

#### Expected Behavior:
- ✅ Toast notification: "Event created successfully"
- ✅ Modal closes automatically
- ✅ Dashboard updates with new event
- ✅ Summary cards show updated statistics
- ✅ Event appears in "My Events" section

### 3. Test Event Data Persistence

#### Verify Database Persistence:
```bash
# Connect to database and check events
docker exec -it gatherly-postgres psql -U gatherly_user -d gatherly_db -c "SELECT id, name, status, total_tickets FROM events;"
```

#### Verify Dashboard Data:
1. Refresh the dashboard page
2. Check that created events persist
3. Verify statistics are accurate
4. Test filtering and sorting

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check if Docker container is running
docker ps | grep gatherly-postgres

# Check container logs
docker logs gatherly-postgres

# Restart container if needed
docker restart gatherly-postgres
```

### Environment Issues
```bash
# Verify environment variables are loaded
echo $DATABASE_URL

# Check .env.local file exists
cat .env.local
```

### Build Issues
```bash
# Clear Next.js cache and rebuild
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## 📊 Event Creation API Flow

### Repository Layer Test:
```typescript
// Test createEvent repository function
const testEvent = {
  organizationId: 'org-123',
  name: 'API Test Event',
  dateTime: new Date('2025-12-01T19:00:00Z'),
  location: 'Test Location',
  status: 'published',
  totalTickets: 100,
  ticketsSold: 0,
  totalRevenue: '0'
}

const result = await createEvent(testEvent)
console.log('Created event:', result.id)
```

### Use Case Layer Test:
```typescript
// Test useCreateEvent hook
const { mutate: createEvent } = useCreateEvent()

createEvent({
  organizationId: 'org-123',
  name: 'Hook Test Event',
  dateTime: '2025-12-01T19:00:00Z',
  location: 'Test Location'
})
```

### Server Action Test:
```typescript
// Test server action directly
const formData = new FormData()
formData.append('name', 'Server Action Test')
formData.append('dateTime', '2025-12-01T19:00:00Z')
formData.append('location', 'Test Location')

await createEventAction(formData)
```

## ✅ Success Criteria

- [ ] Database connection established
- [ ] Test event creation/deletion works
- [ ] UI modal creates events successfully
- [ ] Dashboard shows real event data
- [ ] Statistics calculate correctly
- [ ] Events persist across page refreshes
- [ ] Multi-tenancy works (events isolated by organization)
- [ ] Error handling works properly
- [ ] Loading states display correctly
- [ ] Toast notifications appear

## 🎯 Next Steps After Testing

1. **Event Edit Functionality**: Pre-populate modal for editing
2. **Event Status Management**: Draft/Published transitions
3. **Event Deletion**: Soft delete with confirmation
4. **Bulk Operations**: Select multiple events
5. **Event Search/Filter**: Enhanced filtering options
6. **Event Analytics**: Detailed event statistics
