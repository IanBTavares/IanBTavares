/**
 * Geração do currículo em PDF.
 *
 * Monta um documento de coluna única, texto puro e headings padrão dentro de
 * um iframe oculto e dispara a impressão. O formato é pensado para parsers de
 * ATS: sem tabelas, sem colunas, sem ícones, sem imagens, fontes do sistema,
 * datas em formato consistente e seções com títulos que os parsers reconhecem.
 *
 * Usar iframe em vez de window.open evita bloqueio de pop-up e mantém o
 * usuário na página.
 */
(function () {
  'use strict';

  var FILENAME = 'Ian-Barbosa-Tavares-Curriculo';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  var ACCENT = '#1d4e6e';

  function styles() {
    return [
      '@page { size: A4; margin: 13mm 15mm 13mm; }',
      '* { box-sizing: border-box; }',
      'html, body { margin: 0; padding: 0; }',
      'body {',
      '  font-family: "Segoe UI", "Helvetica Neue", Calibri, Arial, sans-serif;',
      '  font-size: 9.8pt;',
      '  line-height: 1.42;',
      '  color: #262626;',
      '  background: #fff;',
      '  -webkit-print-color-adjust: exact;',
      '  print-color-adjust: exact;',
      '}',
      'strong { font-weight: 600; color: #111; }',
      'a { color: inherit; text-decoration: none; }',
      'p { margin: 0 0 3pt; }',
      'header { padding-bottom: 7pt; border-bottom: 1.6pt solid ' + ACCENT + '; }',
      'h1 { font-size: 24pt; font-weight: 700; line-height: 1.1; letter-spacing: -0.3pt; color: #111; margin: 0 0 3pt; }',
      '.role-line { font-size: 11pt; font-weight: 600; color: ' + ACCENT + '; margin: 0 0 4pt; }',
      '.contact { font-size: 8.8pt; color: #4a4a4a; margin: 0; }',
      '.contact span { white-space: nowrap; }',
      '.sep { color: #9aa7b3; white-space: pre; }',
      'h2 {',
      '  font-size: 9.6pt;',
      '  font-weight: 700;',
      '  text-transform: uppercase;',
      '  letter-spacing: 1.3pt;',
      '  color: ' + ACCENT + ';',
      '  margin: 12pt 0 5pt;',
      '  padding-bottom: 2.5pt;',
      '  border-bottom: 0.6pt solid #c9d5df;',
      '  page-break-after: avoid;',
      '}',
      '.summary { text-align: justify; }',
      '.skill-row { margin-bottom: 2pt; }',
      '.skill-row .label { font-weight: 600; color: ' + ACCENT + '; }',
      '.job { margin-bottom: 8.5pt; page-break-inside: avoid; }',
      '.job-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }',
      'h3 { font-size: 10.5pt; font-weight: 700; color: #111; margin: 0; }',
      '.period { font-size: 9pt; color: #4a4a4a; white-space: nowrap; }',
      '.job-meta { font-size: 9.3pt; margin: 0.5pt 0 2pt; color: #4a4a4a; }',
      '.job-meta .company { font-weight: 600; color: ' + ACCENT + '; }',
      '.context { font-size: 9pt; font-style: italic; color: #555; margin: 0 0 2pt; }',
      'ul { margin: 2pt 0 0; padding-left: 13pt; }',
      'li { margin-bottom: 1.8pt; padding-left: 1pt; }',
      'li::marker { color: ' + ACCENT + '; }',
      '.entry { margin-bottom: 5pt; }',
    ].join('\n');
  }

  // Escapa o texto e converte **trecho** em negrito.
  function rich(value) {
    return esc(value).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  }

  var SEP = '<span class="sep"> | </span>';

  function link(href, label) {
    return '<a href="' + esc(href) + '">' + esc(label) + '</a>';
  }

  function section(title, body) {
    return '<h2>' + esc(title) + '</h2>' + body;
  }

  function buildHeader(r) {
    var contact = [
      esc(r.location),
      esc(r.phone),
      link('mailto:' + r.email, r.email),
      link('https://' + r.linkedin, r.linkedin),
      link('https://' + r.github, r.github),
    ]
      .map(function (item) {
        return '<span>' + item + '</span>';
      })
      .join(SEP);

    return (
      '<header>' +
      '<h1>' + esc(r.name) + '</h1>' +
      '<p class="role-line">' + esc(r.title) + '</p>' +
      '<p class="contact">' + contact + '</p>' +
      '</header>'
    );
  }

  function buildSkills(list) {
    return list
      .map(function (group) {
        return (
          '<p class="skill-row"><span class="label">' + esc(group.label) + ':</span> ' +
          esc(group.items) + '</p>'
        );
      })
      .join('');
  }

  function buildExperience(list) {
    return list
      .map(function (job) {
        var bullets = job.bullets
          .map(function (b) {
            return '<li>' + rich(b) + '</li>';
          })
          .join('');

        return (
          '<div class="job">' +
          '<div class="job-head"><h3>' + esc(job.role) + '</h3>' +
          '<span class="period">' + esc(job.period) + '</span></div>' +
          '<p class="job-meta"><span class="company">' + esc(job.company) + '</span>' +
          (job.location ? SEP + esc(job.location) : '') + '</p>' +
          (job.context ? '<p class="context">' + rich(job.context) + '</p>' : '') +
          '<ul>' + bullets + '</ul>' +
          '</div>'
        );
      })
      .join('');
  }

  function buildEducation(list) {
    return list
      .map(function (item) {
        return (
          '<p class="entry"><strong>' + esc(item.degree) + '</strong><br>' +
          esc([item.school, item.period].filter(Boolean).join(' | ')) + '</p>'
        );
      })
      .join('');
  }

  function buildCertifications(list) {
    return (
      '<ul>' +
      list
        .map(function (item) {
          return '<li>' + esc([item.name, item.issuer, item.year].filter(Boolean).join(' - ')) + '</li>';
        })
        .join('') +
      '</ul>'
    );
  }

  // Ordem pensada para ATS e recrutador: palavras-chave (resumo e habilidades)
  // no topo, depois experiência em ordem cronológica reversa.
  function buildDocument(r) {
    var education = r.education || [];
    var certifications = r.certifications || [];

    return (
      '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8">' +
      '<title>' + esc(FILENAME) + '</title>' +
      '<meta name="author" content="' + esc(r.name) + '">' +
      '<meta name="description" content="' + esc(r.title) + '">' +
      '<style>' + styles() + '</style></head><body>' +
      buildHeader(r) +
      section('Resumo Profissional', '<p class="summary">' + rich(r.summary) + '</p>') +
      section('Habilidades Técnicas', buildSkills(r.skills)) +
      section('Experiência Profissional', buildExperience(r.experience)) +
      (education.length ? section('Formação Acadêmica', buildEducation(education)) : '') +
      (certifications.length ? section('Certificações', buildCertifications(certifications)) : '') +
      section('Idiomas', '<p class="langs">' + r.languages.map(esc).join(SEP) + '</p>') +
      '</body></html>'
    );
  }

  var printing = false;

  function downloadResume(trigger) {
    var resume = window.RESUME;
    if (!resume || printing) return;

    printing = true;
    if (trigger) trigger.setAttribute('data-state', 'working');

    var frame = document.createElement('iframe');
    frame.setAttribute('aria-hidden', 'true');
    frame.setAttribute('title', 'Documento para impressão');
    frame.style.cssText =
      'position:fixed;right:0;bottom:0;width:0;height:0;border:0;opacity:0;';
    document.body.appendChild(frame);

    var cleanup = function () {
      if (frame.parentNode) frame.parentNode.removeChild(frame);
      if (trigger) trigger.removeAttribute('data-state');
      printing = false;
    };

    frame.onload = function () {
      var win = frame.contentWindow;
      // O diálogo de impressão bloqueia a thread; o cleanup roda ao retornar.
      window.setTimeout(function () {
        try {
          win.focus();
          win.print();
        } catch (err) {
          window.console && console.error('Falha ao gerar o PDF:', err);
        }
        window.setTimeout(cleanup, 500);
      }, 120);
    };

    var doc = frame.contentDocument || frame.contentWindow.document;
    doc.open();
    doc.write(buildDocument(resume));
    doc.close();
  }

  document.addEventListener('click', function (event) {
    var trigger = event.target.closest('[data-download-resume]');
    if (!trigger) return;
    event.preventDefault();
    downloadResume(trigger);
  });

  window.downloadResume = downloadResume;
})();
