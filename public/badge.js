/**
 * This script adds a "Made with Replit" badge to your repl when seen in full-browser view
 */

(function replitBadge(theme = 'dark', position = 'bottom-left') {
    // Suppress badge in ReplView
    if (window.location.hostname.split('.')[1] === 'id') {
      return;
    }
  
    // define positions
    // helps reduce polluting css classes
    const offset = '1.5rem';
    const validPositions = {
      'top-left': { top: offset, left: offset },
      'top-right': { top: offset, right: offset },
      'bottom-left': { bottom: offset, left: offset },
      'bottom-right': { bottom: offset, right: offset },
    };
  
    // ensure positions are valid
    if (!validPositions.hasOwnProperty(position)) {
      console.warn(
        `${position} is not a valid position, defaulting to bottom-left`,
      );
      position = 'bottom-right';
    }
  
    // create link & styles
    const badgeAnchor = document.createElement('a');
    Object.assign(badgeAnchor, {
      target: '_blank',
      href: 'https://discord.gg/wQshpCMpgH',
    });
  
    // create badge image & styles
    const badgeImage = document.createElement('img');
    badgeImage.src = `https://img.shields.io/badge/-Powered%20by%20XEpert-111111?style=for-the-badge&logo=data:image/png;base64,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`;
    badgeImage.id = 'replitBadge';
    Object.assign(badgeImage.style, validPositions[position]);
  
    // inject styles
    document.head.insertAdjacentHTML(
      'beforeend',
      `
      <style>
        #replitBadge {
          position: fixed;
          cursor: pointer;
          z-index: 100;
          transition: transform 100ms ease-in-out;
        }
  
        #replitBadge:hover {
          transform: scale(1.05);
        }
      </style>
    `,
    );
  
    // append badge to page
    badgeAnchor.appendChild(badgeImage);
    document.body.appendChild(badgeAnchor);
  })(
    document.currentScript.getAttribute('theme'),
    document.currentScript.getAttribute('position'),
  );