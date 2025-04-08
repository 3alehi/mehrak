function clearCookies(): void {
  const cookies = document.cookie.split(';');
  
  cookies.forEach(cookie => {
    const cookieName = cookie.split('=')[0].trim();
    
    document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=${window.location.hostname};`;
  
  });
}
