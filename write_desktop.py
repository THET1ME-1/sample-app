html = u"""<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <link rel="stylesheet" href="../../css/general.css" />
  <link rel="stylesheet" href="../../css/header.css" />
  <link rel="stylesheet" href="../../css/desktop.css" />
  <title>VisionWatch \u2014 Overwatch Companion</title>
</head>
<body class="desktop">

  <div id="header" class="title-bar">
    <span class="title-bar-text">VisionWatch</span>
    <div class="window-controls-group">
      <button id="minimizeButton" class="window-control window-control-minimize"></button>
      <button id="maximizeButton" class="window-control window-control-maximize"></button>
      <button id="closeButton"    class="window-control window-control-close"></button>
    </div>
  </div>

  <div class="app-layout">

    <aside class="sidebar">
      <div class="sidebar-logo">
        <span class="logo-eye">\U0001f441</span>
        <span class="logo-name">VisionWatch</span>
      </div>

      <nav class="sidebar-nav">
        <button class="nav-btn active" data-tab="profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <span>\u041f\u0440\u043e\u0444\u0438\u043b\u044c</span>
        </button>
        <button class="nav-btn" data-tab="stats">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 9.2h3V19H5zm5.6-4.2H13V19h-2.4zm5.6 8H19v6h-2.8z"/>
          </svg>
          <span>\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430</span>
        </button>
        <button class="nav-btn" data-tab="heroes">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
          </svg>
          <span>\u0413\u0430\u0439\u0434\u044b</span>
        </button>
        <button class="nav-btn" data-tab="guide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
          </svg>
          <span>\u0421\u043f\u0440\u0430\u0432\u043a\u0430</span>
        </button>
      </nav>

      <div class="sidebar-footer">
        <button class="launch-btn" id="launch-game-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c Overwatch</span>
        </button>
      </div>
    </aside>

    <main>

      <section id="tab-profile" class="tab-content active">
        <div class="profile-hero">
          <div class="profile-avatar">
            <span id="profile-initials">?</span>
          </div>
          <div class="profile-info">
            <h2 id="profile-btag">Battle.NET tag \u043f\u043e\u044f\u0432\u0438\u0442\u0441\u044f \u043f\u043e\u0441\u043b\u0435 \u0437\u0430\u043f\u0443\u0441\u043a\u0430 \u0438\u0433\u0440\u044b</h2>
            <p id="profile-subtitle" class="muted">\u0417\u0430\u043f\u0443\u0441\u0442\u0438 Overwatch, \u0447\u0442\u043e\u0431\u044b \u0443\u0432\u0438\u0434\u0435\u0442\u044c \u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u0440\u043e\u0444\u0438\u043b\u044f</p>
          </div>
        </div>

        <div class="stat-cards">
          <div class="stat-card">
            <div class="stat-value" id="stat-total">0</div>
            <div class="stat-label">\u041c\u0430\u0442\u0447\u0435\u0439 \u0441\u044b\u0433\u0440\u0430\u043d\u043e</div>
          </div>
          <div class="stat-card win">
            <div class="stat-value" id="stat-wins">0</div>
            <div class="stat-label">\u041f\u043e\u0431\u0435\u0434\u044b</div>
          </div>
          <div class="stat-card loss">
            <div class="stat-value" id="stat-losses">0</div>
            <div class="stat-label">\u041f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u044f</div>
          </div>
          <div class="stat-card">
            <div class="stat-value" id="stat-winrate">\u2014</div>
            <div class="stat-label">% \u043f\u043e\u0431\u0435\u0434</div>
          </div>
        </div>

        <div class="section-title">\u041b\u044e\u0431\u0438\u043c\u044b\u0435 \u0433\u0435\u0440\u043e\u0438</div>
        <div id="top-heroes-list" class="hero-chips-list">
          <span class="muted">\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445 \u2014 \u0441\u044b\u0433\u0440\u0430\u0439 \u043d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u043c\u0430\u0442\u0447\u0435\u0439</span>
        </div>
      </section>

      <section id="tab-stats" class="tab-content">
        <div class="section-title">\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430 \u043f\u043e \u0433\u0435\u0440\u043e\u044f\u043c</div>
        <div id="hero-stats-table" class="hero-stats-table">
          <div class="table-header">
            <span>\u0413\u0435\u0440\u043e\u0439</span>
            <span>\u041c\u0430\u0442\u0447\u0435\u0439</span>
            <span>\u0420\u043e\u043b\u044c</span>
            <span>\u041f\u043e\u0431\u0435\u0434\u044b</span>
            <span>% \u043f\u043e\u0431\u0435\u0434</span>
            <span>K/D</span>
          </div>
          <div id="hero-stats-rows"></div>
        </div>
        <div class="section-title" style="margin-top:24px">\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 \u043c\u0430\u0442\u0447\u0438</div>
        <div id="recent-matches" class="match-list"></div>
      </section>

      <section id="tab-heroes" class="tab-content">
        <div class="role-filter">
          <button class="role-btn active" data-role="all">\u0412\u0441\u0435</button>
          <button class="role-btn tank"   data-role="Tank">\u0422\u0430\u043d\u043a\u0438</button>
          <button class="role-btn dps"    data-role="DPS">\u0414\u041f\u0421</button>
          <button class="role-btn supp"   data-role="Support">\u0425\u0438\u043b\u0435\u0440\u044b</button>
        </div>
        <div id="hero-guide-grid" class="hero-guide-grid"></div>
      </section>

      <section id="tab-guide" class="tab-content">
        <div class="guide-content">
          <h2>\U0001f4cb \u041a\u0430\u043a \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c\u0441\u044f VisionWatch</h2>

          <div class="guide-section">
            <h3>\U0001f680 \u0417\u0430\u043f\u0443\u0441\u043a</h3>
            <p>VisionWatch \u0437\u0430\u043f\u0443\u0441\u043a\u0430\u0435\u0442\u0441\u044f \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 \u043f\u0440\u0438 \u0441\u0442\u0430\u0440\u0442\u0435 Overwatch. \u041b\u0430\u0443\u043d\u0447\u0435\u0440 \u043e\u0442\u043a\u0440\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u043a\u043e\u0433\u0434\u0430 \u0438\u0433\u0440\u0430 \u043d\u0435 \u0437\u0430\u043f\u0443\u0449\u0435\u043d\u0430. \u041d\u0430\u0436\u043c\u0438 \u043a\u043d\u043e\u043f\u043a\u0443 <strong>\u0417\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c Overwatch</strong> \u0432 \u0431\u043e\u043a\u043e\u0432\u043e\u043c \u043c\u0435\u043d\u044e \u0434\u043b\u044f \u0431\u044b\u0441\u0442\u0440\u043e\u0433\u043e \u0441\u0442\u0430\u0440\u0442\u0430.</p>
          </div>

          <div class="guide-section">
            <h3>\U0001f3ae \u041e\u0432\u0435\u0440\u043b\u0435\u0439 \u0432 \u0438\u0433\u0440\u0435</h3>
            <ul>
              <li><strong>Ctrl+Shift+Z</strong> \u2014 \u043f\u043e\u043a\u0430\u0437\u0430\u0442\u044c / \u0441\u043a\u0440\u044b\u0442\u044c \u043e\u0432\u0435\u0440\u043b\u0435\u0439</li>
              <li>\u041e\u0432\u0435\u0440\u043b\u0435\u0439 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442 \u043a\u0430\u0440\u0442\u0443, \u0441\u043e\u0441\u0442\u0430\u0432 \u043a\u043e\u043c\u0430\u043d\u0434, \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438</li>
              <li>\u0426\u0432\u0435\u0442 \u043d\u0438\u043a\u0430 <span style="color:#6bbf85">\u0437\u0435\u043b\u0451\u043d\u044b\u0439</span> \u2014 \u0441\u043e\u044e\u0437\u043d\u0438\u043a, <span style="color:#b84040">\u043a\u0440\u0430\u0441\u043d\u044b\u0439</span> \u2014 \u0432\u0440\u0430\u0433</li>
              <li>\u0417\u043d\u0430\u0447\u043e\u043a <strong>\u2605</strong> \u0440\u044f\u0434\u043e\u043c \u0441 \u0438\u0433\u0440\u043e\u043a\u043e\u043c \u2014 \u0442\u044b \u0443\u0436\u0435 \u0432\u0441\u0442\u0440\u0435\u0447\u0430\u043b \u0435\u0433\u043e \u0440\u0430\u043d\u044c\u0448\u0435</li>
            </ul>
          </div>

          <div class="guide-section">
            <h3>\U0001f5fa\ufe0f \u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438 \u043f\u043e \u043a\u0430\u0440\u0442\u0435</h3>
            <p>\u041e\u0432\u0435\u0440\u043b\u0435\u0439 \u043f\u043e\u043a\u0430\u0437\u044b\u0432\u0430\u0435\u0442 5 \u043b\u0443\u0447\u0448\u0438\u0445 \u0433\u0435\u0440\u043e\u0435\u0432 \u0434\u043b\u044f \u0442\u0435\u043a\u0443\u0449\u0435\u0439 \u043a\u0430\u0440\u0442\u044b \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043c\u0435\u0442\u0430\u0438\u0433\u0440\u044b.</p>
          </div>

          <div class="guide-section">
            <h3>\U0001f504 \u041a\u043e\u043d\u0442\u0440\u043f\u0438\u043a\u0438</h3>
            <p>\u041f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u0441\u043e\u0441\u0442\u0430\u0432 \u0432\u0440\u0430\u0436\u0435\u0441\u043a\u043e\u0439 \u043a\u043e\u043c\u0430\u043d\u0434\u044b \u0438 \u043f\u0440\u0435\u0434\u043b\u0430\u0433\u0430\u0435\u0442 \u0433\u0435\u0440\u043e\u0435\u0432-\u043a\u043e\u043d\u0442\u0440\u043f\u0438\u043a\u043e\u0432. \u041e\u0431\u043d\u043e\u0432\u043b\u044f\u0435\u0442\u0441\u044f \u043f\u0440\u0438 \u0441\u043c\u0435\u043d\u0435 \u0433\u0435\u0440\u043e\u0435\u0432 \u0432\u0440\u0430\u0433\u0430\u043c\u0438.</p>
          </div>

          <div class="guide-section">
            <h3>\U0001f4ca \u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430</h3>
            <p>\u0412\u0441\u0435 \u043c\u0430\u0442\u0447\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u044e\u0442\u0441\u044f \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e. \u041d\u0430 \u0432\u043a\u043b\u0430\u0434\u043a\u0435 <strong>\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430</strong> \u2014 \u0434\u0430\u043d\u043d\u044b\u0435 \u043f\u043e \u0433\u0435\u0440\u043e\u044f\u043c, \u0438\u0441\u0442\u043e\u0440\u0438\u044f \u043c\u0430\u0442\u0447\u0435\u0439 \u0438 \u043f\u0440\u043e\u0446\u0435\u043d\u0442 \u043f\u043e\u0431\u0435\u0434.</p>
          </div>

          <div class="guide-section">
            <h3>\U0001f9ed \u0413\u0430\u0439\u0434\u044b \u043f\u043e \u0433\u0435\u0440\u043e\u044f\u043c</h3>
            <p>\u041d\u0430 \u0432\u043a\u043b\u0430\u0434\u043a\u0435 <strong>\u0413\u0430\u0439\u0434\u044b</strong> \u2014 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043e \u043a\u0430\u0436\u0434\u043e\u043c \u0433\u0435\u0440\u043e\u0435: \u0440\u043e\u043b\u044c, \u0441\u043b\u043e\u0436\u043d\u043e\u0441\u0442\u044c, \u043a\u043e\u043d\u0442\u0440\u043f\u0438\u043a\u0438. \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439 \u0444\u0438\u043b\u044c\u0442\u0440 \u043f\u043e \u0440\u043e\u043b\u044f\u043c.</p>
          </div>

          <div class="guide-section error-section">
            <h3>\U0001f41b \u0411\u0430\u0433\u0438 \u0438 \u043e\u0448\u0438\u0431\u043a\u0438</h3>
            <p>\u041f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 \u0441\u043e\u0445\u0440\u0430\u043d\u044f\u0435\u0442 \u0432\u0441\u0435 \u043e\u0448\u0438\u0431\u043a\u0438 \u0432 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u0439 \u0436\u0443\u0440\u043d\u0430\u043b.</p>
            <button id="clear-errors-btn" class="btn-secondary">\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u0436\u0443\u0440\u043d\u0430\u043b \u043e\u0448\u0438\u0431\u043e\u043a</button>
            <span id="error-count" class="muted"></span>
          </div>
        </div>
      </section>

    </main>
  </div>

</body>
</html>
"""

with open(r'c:\Users\Alex\Documents\GitHub\Visionwatch\ts\src\desktop\desktop.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done, chars:', len(html))
