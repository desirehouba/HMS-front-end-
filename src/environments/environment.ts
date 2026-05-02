export const environment = {
  production: true,
 // apiUrl: 'http://localhost:4200',
  apiUrlKey : 'https://pessi.ms-hotel.net/api',
  apiUrl:  'https://' + localStorage.getItem('rtr')+'.ms-hotel.net/api',
  imageDirectoryPatch: 'https://' + localStorage.getItem('rtr')+'.ms-hotel.net/api',
  imageDirectoryPatchs: 'https://' + localStorage.getItem('rtr')+'.ms-hotel.net/uploads/',
}; 