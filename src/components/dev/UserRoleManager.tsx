
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Crown, Shield, User, Mail, Calendar, Settings, Trash2, Plus } from 'lucide-react';

interface UserRole {
  id: string;
  email: string;
  role: 'lead_developer' | 'admin' | 'moderator' | 'editor' | 'user';
  permissions: string[];
  assignedBy: string;
  assignedDate: string;
  lastActive: string;
}

const ROLE_HIERARCHY = {
  lead_developer: { level: 5, label: 'Lead Developer', icon: Crown, color: 'gold' },
  admin: { level: 4, label: 'Administrator', icon: Shield, color: 'red' },
  moderator: { level: 3, label: 'Moderator', icon: Settings, color: 'blue' },
  editor: { level: 2, label: 'Editor', icon: User, color: 'green' },
  user: { level: 1, label: 'User', icon: User, color: 'gray' }
};

const PERMISSIONS = [
  'manage_users', 'manage_content', 'manage_comments', 'manage_saints',
  'view_analytics', 'manage_settings', 'manage_roles', 'delete_content'
];

export function UserRoleManager() {
  const [users, setUsers] = useState<UserRole[]>([
    {
      id: '1',
      email: 'jblinxstudio@gmail.com',
      role: 'lead_developer',
      permissions: PERMISSIONS,
      assignedBy: 'System',
      assignedDate: '2025-01-01',
      lastActive: '2025-01-15'
    },
    {
      id: '2',
      email: 'admin@orthodoxechoes.com',
      role: 'admin',
      permissions: ['manage_content', 'manage_comments', 'view_analytics'],
      assignedBy: 'jblinxstudio@gmail.com',
      assignedDate: '2025-01-10',
      lastActive: '2025-01-14'
    }
  ]);
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<keyof typeof ROLE_HIERARCHY>('user');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleAddUser = () => {
    if (!newUserEmail) {
      toast.error('Please enter an email address');
      return;
    }

    if (users.some(user => user.email === newUserEmail)) {
      toast.error('User already exists');
      return;
    }

    const newUser: UserRole = {
      id: (users.length + 1).toString(),
      email: newUserEmail,
      role: newUserRole,
      permissions: selectedPermissions,
      assignedBy: 'jblinxstudio@gmail.com',
      assignedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Never'
    };

    setUsers([...users, newUser]);
    setNewUserEmail('');
    setNewUserRole('user');
    setSelectedPermissions([]);
    
    toast.success('User added successfully', {
      description: `${newUserEmail} has been granted ${ROLE_HIERARCHY[newUserRole].label} role`
    });
  };

  const handleRemoveUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user?.email === 'jblinxstudio@gmail.com') {
      toast.error('Cannot remove lead developer');
      return;
    }

    if (confirm(`Remove user ${user?.email}?`)) {
      setUsers(users.filter(u => u.id !== id));
      toast.success('User removed successfully');
    }
  };

  const getRoleIcon = (role: keyof typeof ROLE_HIERARCHY) => {
    const IconComponent = ROLE_HIERARCHY[role].icon;
    return <IconComponent className="h-4 w-4" />;
  };

  const getRoleBadge = (role: keyof typeof ROLE_HIERARCHY) => {
    const roleInfo = ROLE_HIERARCHY[role];
    return (
      <Badge 
        variant="outline" 
        className={`text-${roleInfo.color}-400 border-${roleInfo.color}-400/30`}
      >
        {getRoleIcon(role)}
        <span className="ml-1">{roleInfo.label}</span>
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            User Role Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="user@orthodoxechoes.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLE_HIERARCHY).map(([key, value]) => (
                    key !== 'lead_developer' && (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(key as keyof typeof ROLE_HIERARCHY)}
                          {value.label}
                        </div>
                      </SelectItem>
                    )
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button onClick={handleAddUser} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                      {user.email === 'jblinxstudio@gmail.com' && (
                        <Crown className="h-4 w-4 text-gold" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 3).map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                      {user.permissions.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.permissions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {user.lastActive}
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.email !== 'jblinxstudio@gmail.com' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
