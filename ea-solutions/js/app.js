// app.js - vanilla JS for ea-solutions

(function () {
  // Cache DOM elements
  const articlesEl = document.getElementById('articles');
  const featuredEl = document.getElementById('featured');
  const reader = document.getElementById('reader');
  const readerContent = document.getElementById('reader-content');
  const closeReader = document.getElementById('close-reader');
  const searchEl = document.getElementById('search');
  const catEl = document.getElementById('category');

  // Initial render
  renderFeatured();
  renderArticles();

  function renderArticles(search = '', category = '') {
    articlesEl.innerHTML = '';

    let filtered = articles;

    if (search) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category && category !== 'all') {
      filtered = filtered.filter(a => a.category === category);
    }

    filtered.forEach(a => {
      const card = document.createElement('article');
      card.className = 'card';

      const h3 = document.createElement('h3');
      h3.textContent = a.title;

      const p = document.createElement('p');
      p.textContent = a.excerpt;

      const meta = document.createElement('div');
      meta.className = 'meta';

      const tag = document.createElement('span');
      tag.className = 'tag-pill';
      tag.textContent = a.category;

      const time = document.createElement('span');
      time.textContent = `${a.date} • ${a.readingTime}`;

      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = 'Open';
      btn.addEventListener('click', () => openReader(a.id));

      meta.append(tag, time, btn);
      card.append(h3, p, meta);
      articlesEl.appendChild(card);
    });
  }

  function renderFeatured() {
    featuredEl.innerHTML = '';
    articles.slice(0, 3).forEach(a => {
      const item = document.createElement('div');
      item.className = 'item';

      const left = document.createElement('div');
      left.style.cssText = `
        width: 44px;
        height: 44px;
        border-radius: 8px;
        background: #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
      `;
      left.textContent = a.title.split(' ')[0]?.slice(0, 2).toUpperCase() || 'T';

      const right = document.createElement('div');

      const t = document.createElement('div');
      t.textContent = a.title;
      t.style.cssText = 'font-size:14px;font-weight:600;';

      const s = document.createElement('div');
      s.textContent = `${a.readingTime} • ${a.category}`;
      s.style.cssText = 'font-size:12px;color:#64748b;margin-top:4px;';

      right.append(t, s);
      item.append(left, right);
      featuredEl.appendChild(item);
    });
  }

  function openReader(id) {
    const article = articles.find(x => x.id === id);
    if (!article) return;

    readerContent.innerHTML = `
      <h2>${article.title}</h2>
      <div style="color:#6b7280;margin-bottom:12px">
        ${article.date} • ${article.readingTime} • ${article.category}
      </div>
      <div>${article.content}</div>
    `;
    reader.classList.remove('hidden');
    reader.setAttribute('aria-hidden', 'false');
  }

  function closeArticleReader() {
    reader.classList.add('hidden');
    reader.setAttribute('aria-hidden', 'true');
    readerContent.innerHTML = '';
  }

  // Close reader on button click or backdrop click
  closeReader.addEventListener('click', closeArticleReader);
  reader.addEventListener('click', e => {
    if (e.target === reader) closeArticleReader();
  });

  // Search & Filter Events
  searchEl?.addEventListener('input', () =>
    renderArticles(searchEl.value, catEl?.value || '')
  );
  catEl?.addEventListener('change', () =>
    renderArticles(searchEl?.value || '', catEl.value)
  );

  // Dummy actions
  document.getElementById('join')?.addEventListener('click', () => {
    alert('Thanks — (this demo has no backend).');
  });

  document.getElementById('subscribe')?.addEventListener('click', () => {
    alert('Subscribe clicked — add your email integration.');
  });

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
})();