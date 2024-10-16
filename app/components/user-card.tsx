import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MapPin } from 'lucide-react'
// import { Dialog } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { set } from 'date-fns'

interface User {
  id: string
  name: string
  phoneNumber: string
  email?: string
  location?: string
}

interface UserCardProps {
  user: User
}

// export function UserCard({ user }: UserCardProps) {
//   const [isDialogOpen, setDialogOpen] = useState(false);
//   const [editedName, setEditedName] = useState(user.name);
//   const [editedPhoneNumber, seteditedPhoneNumber] = useState(user.phoneNumber);
//   const [editedEmail, seteditedEmail] = useState(user.email);
//   const [editedLocation, seteditedLocation] = useState(user.location);

export function UserCard({ user }: UserCardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [userData, setUserData] = useState(user); // Move user data into state
  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name, 
    phoneNumber: user.phoneNumber, 
    email: user.email || '',
    location: user.location || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
  };

  const handleSave = () => {
    console.log("Updated User Data: ", formData);
    setUserData(formData); // Update displayed data
    setDialogOpen(false);
  };




  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
          <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{userData.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">ID: {userData.id}</Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{userData.phoneNumber}</span>
        </div>
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{userData.email}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{userData.location}</span>
          </div>
        )}
      </CardContent>

      {/* Edit Dialog*/}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>Edit User</DialogTitle>
          <form action="" className='space-y-4'>
            <div>
              <label htmlFor="" className='block text-sm font-medium'>Name</label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                // onChange={(e) => setEditedName(e.target.value)}
                onChange = {handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="" className='block text-sm font-medium'>Phone Number</label>
              <input 
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="" className='block text-sm font-medium'>Email</label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="" className='block text-sm font-medium'>Location</label>
              <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className='flex justify-end gap-2 mt-4'>
              <Button type='button' variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Save</Button>
          </div>
          </form>
        </DialogContent>
      </Dialog>

      {/*  Edit Button */}
      <div className="flex justify-center mt-4">
        <Button 
          onClick={() => setDialogOpen(true)}
          className={cn(
            "bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors",
            "hover:bg-blue-600 hover:text-white"
          )}
        >
          Edit
        </Button>
      </div>
      
    </Card>
  )
}