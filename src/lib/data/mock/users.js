// Mock Users for Radio Roža
// Korisnici koji se mogu prijaviti u CMS sustav

export const users = [
  {
    id: 'usr_001',
    email: 'admin@radio-roza.org',
    username: 'admin',
    firstName: 'Admin',
    lastName: 'Roža',
    role: 'admin',
    isActive: true,
    avatar: '/avatars/admin.jpg',
    createdDate: '2020-01-15T10:00:00Z',
    updatedDate: '2024-01-10T14:30:00Z',
    lastLogin: '2024-01-10T14:30:00Z',
    preferences: {
      language: 'hr',
      theme: 'dark',
      emailNotifications: true
    }
  },
  {
    id: 'usr_002',
    email: 'ana.horvat@radio-roza.org',
    username: 'ana.horvat',
    firstName: 'Ana',
    lastName: 'Horvat',
    role: 'editor',
    isActive: true,
    avatar: '/avatars/ana-horvat.jpg',
    createdDate: '2021-03-20T09:00:00Z',
    updatedDate: '2024-01-09T11:15:00Z',
    lastLogin: '2024-01-09T11:15:00Z',
    preferences: {
      language: 'hr',
      theme: 'light',
      emailNotifications: true
    }
  },
  {
    id: 'usr_003',
    email: 'marko.novak@radio-roza.org',
    username: 'marko.novak',
    firstName: 'Marko',
    lastName: 'Novak',
    role: 'author',
    isActive: true,
    avatar: '/avatars/marko-novak.jpg',
    createdDate: '2021-06-10T12:00:00Z',
    updatedDate: '2024-01-08T16:45:00Z',
    lastLogin: '2024-01-08T16:45:00Z',
    preferences: {
      language: 'hr',
      theme: 'auto',
      emailNotifications: false
    }
  },
  {
    id: 'usr_004',
    email: 'petra.simic@radio-roza.org',
    username: 'petra.simic',
    firstName: 'Petra',
    lastName: 'Šimić',
    role: 'author',
    isActive: true,
    avatar: '/avatars/petra-simic.jpg',
    createdDate: '2022-01-05T14:30:00Z',
    updatedDate: '2024-01-07T10:20:00Z',
    lastLogin: '2024-01-07T10:20:00Z',
    preferences: {
      language: 'hr',
      theme: 'light',
      emailNotifications: true
    }
  },
  {
    id: 'usr_005',
    email: 'ivan.babic@radio-roza.org',
    username: 'ivan.babic',
    firstName: 'Ivan',
    lastName: 'Babić',
    role: 'contributor',
    isActive: true,
    avatar: '/avatars/ivan-babic.jpg',
    createdDate: '2022-09-12T11:00:00Z',
    updatedDate: '2024-01-05T13:10:00Z',
    lastLogin: '2024-01-05T13:10:00Z',
    preferences: {
      language: 'hr',
      theme: 'dark',
      emailNotifications: true
    }
  },
  {
    id: 'usr_006',
    email: 'guest.writer@gmail.com',
    username: 'guest.writer',
    firstName: 'Guest',
    lastName: 'Writer',
    role: 'guest',
    isActive: false,
    avatar: null,
    createdDate: '2023-02-20T15:00:00Z',
    updatedDate: '2023-12-01T09:30:00Z',
    lastLogin: '2023-12-01T09:30:00Z',
    preferences: {
      language: 'en',
      theme: 'light',
      emailNotifications: false
    }
  }
];

// Helper funkcije za rad s korisnicima
export function getUserById(id) {
  return users.find(user => user.id === id);
}

export function getUserByUsername(username) {
  return users.find(user => user.username === username);
}

export function getUserByEmail(email) {
  return users.find(user => user.email === email);
}

export function getActiveUsers() {
  return users.filter(user => user.isActive);
}

export function getUsersByRole(role) {
  return users.filter(user => user.role === role);
}

export function getUserFullName(userId) {
  const user = getUserById(userId);
  return user ? `${user.firstName} ${user.lastName}` : null;
}

export default users;
