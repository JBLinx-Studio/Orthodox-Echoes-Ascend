
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  UserCircle, Search, Filter, MoreHorizontal, 
  ShieldCheck, Mail, Calendar, Eye, Lock, UserPlus
} from 'lucide-react';
import { toast } from 'sonner';
import { UserProfile } from '@/types/BlogPost';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Sample user data - in a real app, this would come from a database
const MOCK_USERS: UserProfile[] = [
  {
    id: '1',
    username: 'donovan',
    email: 'donovan@orthodoxechoes.com',
    displayName: 'Donovan',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=DO',
    bio: 'Administrator and founder of Orthodox Echoes',
    role: 'admin',
    joinDate: '2023-01-15T12:00:00Z',
    lastActive: '2023-05-05T14:30:00Z',
    comments: 42,
    likes: 75,
    followers: 120
  },
  {
    id: '2',
    username: 'john_traditionist',
    email: 'john@orthodox.com',
    displayName: 'John the Traditionist',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JT',
    bio: 'Orthodox theology enthusiast and writer',
    role: 'contributor',
    joinDate: '2023-02-20T10:15:00Z',
    lastActive: '2023-05-04T16:45:00Z',
    comments: 86,
    likes: 124,
    followers: 45
  },
  {
    id: '3',
    username: 'maria_faith',
    email: 'maria@example.com',
    displayName: 'Maria',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=MF',
    bio: 'Exploring the depths of Orthodox spirituality',
    role: 'moderator',
    joinDate: '2023-02-25T09:30:00Z',
    lastActive: '2023-05-05T10:20:00Z',
    comments: 53,
    likes: 89,
    followers: 38
  },
  {
    id: '4',
    username: 'father_nicholas',
    email: 'frnicolas@parish.org',
    displayName: 'Fr. Nicholas',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=FN',
    bio: 'Parish priest and theological writer',
    role: 'contributor',
    joinDate: '2023-03-10T14:20:00Z',
    lastActive: '2023-05-03T13:15:00Z',
    comments: 29,
    likes: 47,
    followers: 72
  },
  {
    id: '5',
    username: 'pilgrim_anna',
    email: 'anna@pilgrim.com',
    displayName: 'Anna the Pilgrim',
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=AP',
    bio: 'Documenting sacred sites around the Orthodox world',
    role: 'user',
    joinDate: '2023-03-15T08:45:00Z',
    lastActive: '2023-05-02T09:30:00Z',
    comments: 17,
    likes: 32,
    followers: 26
  }
];

export function UserManager() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch users
    const timer = setTimeout(() => {
      setUsers(MOCK_USERS);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'admins' && user.role === 'admin') ||
      (activeTab === 'moderators' && user.role === 'moderator') ||
      (activeTab === 'contributors' && user.role === 'contributor') ||
      (activeTab === 'users' && user.role === 'user');
      
    return matchesSearch && matchesTab;
  });

  const handlePromoteUser = (userId: string) => {
    toast.success("User role updated", {
      description: "The user's permissions have been updated successfully."
    });
    // In a real app, this would update the user's role in the database
  };

  const handleBanUser = (userId: string) => {
    toast.success("User access restricted", {
      description: "The user has been banned from the platform."
    });
    // In a real app, this would update the user's status in the database
  };

  return (
    <div className="space-y-6">
      <Card className="border-gold/20">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-semibold">User Management</CardTitle>
          <Button className="bg-byzantine hover:bg-byzantine-dark">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="h-10">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4 bg-background/50">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
              <TabsTrigger value="moderators">Moderators</TabsTrigger>
              <TabsTrigger value="contributors">Contributors</TabsTrigger>
              <TabsTrigger value="users">Regular Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab}>
              <div className="rounded-md border">
                <Table>
                  <TableCaption>Total users: {filteredUsers.length}</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">User</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      [...Array(5)].map((_, i) => (
                        <TableRow key={i} className="animate-pulse">
                          <TableCell>
                            <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                          </TableCell>
                          <TableCell>
                            <div className="h-4 w-40 bg-gray-700 rounded"></div>
                            <div className="h-3 w-32 bg-gray-700 rounded mt-2 opacity-60"></div>
                          </TableCell>
                          <TableCell><div className="h-5 w-20 bg-gray-700 rounded"></div></TableCell>
                          <TableCell><div className="h-4 w-24 bg-gray-700 rounded"></div></TableCell>
                          <TableCell><div className="h-4 w-28 bg-gray-700 rounded"></div></TableCell>
                          <TableCell><div className="h-8 w-8 bg-gray-700 rounded-full ml-auto"></div></TableCell>
                        </TableRow>
                      ))
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Avatar>
                              <AvatarImage src={user.avatarUrl} alt={user.displayName || user.username} />
                              <AvatarFallback>
                                {user.displayName?.[0] || user.username[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium flex items-center">
                              {user.displayName || user.username}
                              {user.role === 'admin' && (
                                <ShieldCheck className="h-4 w-4 ml-1 text-green-500" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {user.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                user.role === 'admin' 
                                  ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30' 
                                  : user.role === 'moderator'
                                  ? 'bg-blue-500/20 text-blue-500 hover:bg-blue-500/30'
                                  : user.role === 'contributor'
                                  ? 'bg-purple-500/20 text-purple-500 hover:bg-purple-500/30'
                                  : 'bg-gray-500/20 text-gray-500 hover:bg-gray-500/30'
                              }
                            >
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                              {new Date(user.joinDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center text-sm">
                              <Eye className="h-3 w-3 mr-1 text-muted-foreground" />
                              {user.lastActive 
                                ? `Last seen ${new Date(user.lastActive).toLocaleDateString()}`
                                : 'Never active'}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <UserCircle className="h-4 w-4 mr-2" />
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handlePromoteUser(user.id)}>
                                  <ShieldCheck className="h-4 w-4 mr-2" />
                                  Change Role
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Contact User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-500 focus:text-red-500"
                                  onClick={() => handleBanUser(user.id)}
                                >
                                  <Lock className="h-4 w-4 mr-2" />
                                  Ban User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                          No users found matching your search criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
