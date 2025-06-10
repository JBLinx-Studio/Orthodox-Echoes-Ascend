import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Edit, Trash2, Plus, User, Shield, Crown, Users } from 'lucide-react';
import { UserProfile } from '@/types/BlogPost';

// Mock data for demonstration - Remove non-existent properties
const MOCK_USERS: UserProfile[] = [
  {
    id: "1",
    username: 'admin',
    email: 'admin@orthodoxechoes.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Site administrator and Orthodox theology enthusiast.',
    isActive: true
  },
  {
    id: "2",
    username: 'fr_john',
    email: 'fr.john@orthodoxechoes.com',
    role: 'contributor',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Orthodox priest and spiritual writer.',
    isActive: true
  },
  {
    id: "3",
    username: 'maria_icon',
    email: 'maria@orthodoxechoes.com',
    role: 'contributor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Iconographer and Orthodox art historian.',
    isActive: true
  },
  {
    id: "4",
    username: 'moderator_paul',
    email: 'paul@orthodoxechoes.com',
    role: 'moderator',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Community moderator and theology student.',
    isActive: true
  },
  {
    id: "5",
    username: 'user_mary',
    email: 'mary@example.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Orthodox faithful seeking spiritual growth.',
    isActive: false
  },
];

export function UserManager() {
  const [users, setUsers] = useState<UserProfile[]>(MOCK_USERS);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  
  // Form state
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'user' | 'admin' | 'moderator' | 'contributor'>('user');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    }
  };
  
  const handleEdit = (user: UserProfile) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setBio(user.bio || '');
    setAvatar(user.avatar || '');
    setIsActive(user.isActive);
    setIsAddingUser(false);
  };
  
  const handleNewUser = () => {
    resetForm();
    setIsAddingUser(true);
    setEditingUser(null);
  };
  
  const resetForm = () => {
    setUsername('');
    setEmail('');
    setRole('user');
    setBio('');
    setAvatar('');
    setIsActive(true);
  };
  
  const handleSave = () => {
    if (!username || !email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    if (editingUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === editingUser.id 
          ? {
              ...user,
              username,
              email,
              role,
              bio: bio || undefined,
              avatar: avatar || undefined,
              isActive
            } 
          : user
      );
      
      setUsers(updatedUsers);
      toast.success('User updated successfully');
    } else {
      // Add new user
      const newUser: UserProfile = {
        id: (users.length + 1).toString(),
        username,
        email,
        role,
        bio: bio || undefined,
        avatar: avatar || undefined,
        isActive
      };
      
      setUsers([...users, newUser]);
      toast.success('New user created successfully');
    }
    
    resetForm();
    setIsAddingUser(false);
    setEditingUser(null);
  };
  
  const handleCancel = () => {
    resetForm();
    setIsAddingUser(false);
    setEditingUser(null);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'moderator':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'contributor':
        return <Users className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl">User Management</CardTitle>
          <Button onClick={handleNewUser} className="bg-byzantine hover:bg-byzantine-dark">
            <Plus className="h-4 w-4 mr-2" /> New User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">User</th>
                    <th className="py-3 px-4 text-left font-medium">Email</th>
                    <th className="py-3 px-4 text-left font-medium">Role</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={user.avatar || '/placeholder.svg'}
                              alt={user.username}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{user.username}</div>
                            {user.bio && (
                              <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {user.bio}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                            : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
                        }`}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {(isAddingUser || editingUser) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{editingUser ? 'Edit User' : 'Create New User'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  placeholder="Enter username" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="Enter email" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="contributor">Contributor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  placeholder="Enter bio" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input 
                  id="avatar" 
                  value={avatar} 
                  onChange={(e) => setAvatar(e.target.value)} 
                  placeholder="Enter avatar URL" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isActive">Status</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    {isActive ? 'Active' : 'Inactive'}
                  </Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button className="bg-byzantine hover:bg-byzantine-dark" onClick={handleSave}>
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
