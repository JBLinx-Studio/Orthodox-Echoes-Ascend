
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
import { 
  Crown, Shield, User, Mail, Calendar, Settings, Trash2, Plus, 
  Search, Filter, UserCheck, AlertTriangle, Home, RefreshCw
} from 'lucide-react';
import { getUserRole, isLeadAdmin } from '@/utils/auth-utils';

interface UserRole {
  id: string;
  email: string;
  role: 'lead_admin' | 'admin' | 'moderator' | 'editor' | 'user';
  permissions: string[];
  assignedBy: string;
  assignedDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
}

const ROLE_HIERARCHY = {
  lead_admin: { level: 5, label: 'Lead Administrator', icon: Crown, color: 'gold' },
  admin: { level: 4, label: 'Administrator', icon: Shield, color: 'red' },
  moderator: { level: 3, label: 'Moderator', icon: Settings, color: 'blue' },
  editor: { level: 2, label: 'Editor', icon: User, color: 'green' },
  user: { level: 1, label: 'User', icon: User, color: 'gray' }
};

const PERMISSIONS = [
  'manage_users', 'manage_content', 'manage_comments', 'manage_saints',
  'view_analytics', 'manage_settings', 'manage_roles', 'delete_content',
  'system_admin', 'lead_developer', 'database_access', 'security_config'
];

export function UserRoleManager() {
  const [currentUserRole, setCurrentUserRole] = useState<string>('user');
  const [isCurrentLeadAdmin, setIsCurrentLeadAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [users, setUsers] = useState<UserRole[]>([
    {
      id: '1',
      email: 'jblinxstudio@gmail.com',
      role: 'lead_admin',
      permissions: PERMISSIONS,
      assignedBy: 'System',
      assignedDate: '2025-01-01',
      lastActive: '2025-01-15',
      status: 'active'
    },
    {
      id: '2',
      email: 'EthosofOrthodoxy@Gmail.com',
      role: 'lead_admin',
      permissions: PERMISSIONS,
      assignedBy: 'System',
      assignedDate: '2025-01-01',
      lastActive: '2025-01-14',
      status: 'active'
    },
    {
      id: '3',
      email: 'admin@orthodoxechoes.com',
      role: 'admin',
      permissions: ['manage_content', 'manage_comments', 'view_analytics'],
      assignedBy: 'jblinxstudio@gmail.com',
      assignedDate: '2025-01-10',
      lastActive: '2025-01-14',
      status: 'active'
    }
  ]);
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<keyof typeof ROLE_HIERARCHY>('user');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    const loadUserRole = async () => {
      try {
        const role = await getUserRole();
        const leadAdmin = await isLeadAdmin();
        setCurrentUserRole(role);
        setIsCurrentLeadAdmin(leadAdmin);
      } catch (error) {
        console.error('Error loading user role:', error);
      }
    };

    loadUserRole();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

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
      assignedBy: 'System Admin',
      assignedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Never',
      status: 'active'
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
    
    // Protect lead admins from being removed
    if (user?.role === 'lead_admin') {
      toast.error('Cannot remove Lead Administrator');
      return;
    }

    if (confirm(`Remove user ${user?.email}?`)) {
      setUsers(users.filter(u => u.id !== id));
      toast.success('User removed successfully');
    }
  };

  const handleSuspendUser = (id: string) => {
    const user = users.find(u => u.id === id);
    if (user?.role === 'lead_admin') {
      toast.error('Cannot suspend Lead Administrator');
      return;
    }

    setUsers(users.map(u => 
      u.id === id 
        ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' }
        : u
    ));
    
    const newStatus = users.find(u => u.id === id)?.status === 'suspended' ? 'active' : 'suspended';
    toast.success(`User ${newStatus === 'suspended' ? 'suspended' : 'reactivated'}`);
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

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'green',
      inactive: 'yellow',
      suspended: 'red'
    };
    
    return (
      <Badge 
        variant="outline" 
        className={`text-${colors[status as keyof typeof colors]}-400 border-${colors[status as keyof typeof colors]}-400/30`}
      >
        {status}
      </Badge>
    );
  };

  const handleReturnHome = () => {
    window.location.hash = '/';
  };

  return (
    <div className="space-y-6">
      {/* Header with Return Home Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display text-gold">User Role Management</h2>
          <p className="text-white/70">Manage user roles and permissions across the platform</p>
        </div>
        <Button variant="ghost" onClick={handleReturnHome} className="text-white/70 hover:text-white">
          <Home className="w-4 h-4 mr-2" />
          Return Home
        </Button>
      </div>

      {/* Enhanced Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-[#1A1F2C]/60 border-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gold">
              <Search className="h-4 w-4" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0C1118] border-gold/30"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="bg-[#0C1118] border-gold/30">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {Object.entries(ROLE_HIERARCHY).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      {getRoleIcon(key as keyof typeof ROLE_HIERARCHY)}
                      {value.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/60 border-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gold">
              <Plus className="h-4 w-4" />
              Add New User
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              placeholder="user@orthodoxechoes.com"
              className="bg-[#0C1118] border-gold/30"
            />
            <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
              <SelectTrigger className="bg-[#0C1118] border-gold/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROLE_HIERARCHY).map(([key, value]) => (
                  (!isCurrentLeadAdmin && key === 'lead_admin') ? null : (
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
            <Button onClick={handleAddUser} className="w-full bg-byzantine hover:bg-byzantine-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1F2C]/60 border-gold/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gold">
              <UserCheck className="h-4 w-4" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Total Users:</span>
              <Badge variant="outline">{users.length}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Active:</span>
              <Badge variant="outline" className="text-green-400 border-green-400/30">
                {users.filter(u => u.status === 'active').length}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Lead Admins:</span>
              <Badge variant="outline" className="text-gold border-gold/30">
                {users.filter(u => u.role === 'lead_admin').length}
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <RefreshCw className="h-3 w-3 mr-2" />
              Refresh Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lead Admin Alert */}
      {isCurrentLeadAdmin && (
        <Alert className="border-gold/20 bg-gold/10">
          <Crown className="h-4 w-4 text-gold" />
          <AlertDescription className="text-gold">
            You have Lead Administrator privileges. Exercise these powers responsibly for the Orthodox Echoes community.
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced User Table */}
      <Card className="bg-[#1A1F2C]/60 border-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gold">
            <Shield className="h-5 w-5" />
            User Directory ({filteredUsers.length} users)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className={user.status === 'suspended' ? 'opacity-60' : ''}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user.email}</span>
                      {user.role === 'lead_admin' && (
                        <Crown className="h-4 w-4 text-gold" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.slice(0, 2).map((permission) => (
                        <Badge key={permission} variant="secondary" className="text-xs">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                      {user.permissions.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.permissions.length - 2} more
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
                    <div className="flex items-center gap-2">
                      {user.role !== 'lead_admin' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSuspendUser(user.id)}
                            className={user.status === 'suspended' 
                              ? "text-green-400 hover:text-green-300" 
                              : "text-yellow-400 hover:text-yellow-300"
                            }
                          >
                            {user.status === 'suspended' ? (
                              <UserCheck className="h-4 w-4" />
                            ) : (
                              <AlertTriangle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveUser(user.id)}
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
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
