// serviceWorker.js

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] เป็นที่อยู่ localhost ใน IPv6
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 เป็นที่อยู่ localhost ใน IPv4
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          checkValidServiceWorker(swUrl, config);
  
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'แอปพลิเคชันถูกโหลดไปแล้วและทำงานแบบออฟไลน์ได้'
            );
          });
        } else {
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log(
                  'แอปพลิเคชันถูกอัปเดตแล้วและสามารถใช้งานแบบออฟไลน์ได้'
                );
              } else {
                console.log('แอปพลิเคชันพร้อมทำงานแบบออฟไลน์แล้ว');
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('การลงทะเบียน Service Worker ล้มเหลว:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'ไม่พบการเชื่อมต่ออินเทอร์เน็ต แอปพลิเคชันทำงานในโหมดแบบออฟไลน์'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister();
        })
        .catch(error => {
          console.error('การยกเลิกการลงทะเบียน Service Worker ล้มเหลว:', error);
        });
    }
  }
  