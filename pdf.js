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

  function styles() {
    return [
      '@page { size: A4; margin: 14mm 15mm; }',
      '* { box-sizing: border-box; }',
      'html, body { margin: 0; padding: 0; }',
      'body {',
      '  font-family: Arial, Helvetica, sans-serif;',
      '  font-size: 10pt;',
      '  line-height: 1.42;',
      '  color: #000;',
      '  background: #fff;',
      '  -webkit-print-color-adjust: exact;',
      '  print-color-adjust: exact;',
      '}',
      'h1 { font-size: 20pt; line-height: 1.15; margin: 0 0 4pt; letter-spacing: 0.2pt; }',
      'h2 {',
      '  font-size: 11pt;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.8pt;',
      '  margin: 14pt 0 6pt;',
      '  padding-bottom: 2pt;',
      '  border-bottom: 1pt solid #000;',
      '  page-break-after: avoid;',
      '}',
      'h3 { font-size: 10.5pt; margin: 0; }',
      'p { margin: 0 0 4pt; }',
      'ul { margin: 4pt 0 0; padding-left: 14pt; }',
      'li { margin-bottom: 2.5pt; }',
      '.role-line { font-size: 10pt; margin: 0 0 1pt; }',
      '.headline { font-size: 11pt; margin: 0 0 5pt; }',
      '.contact { font-size: 9.5pt; margin: 0; }',
      '.contact span { white-space: nowrap; }',
      '.job { margin-bottom: 10pt; page-break-inside: avoid; }',
      '.job-head { margin-bottom: 2pt; }',
      '.job-meta { font-size: 9.5pt; margin: 0; }',
      '.period { font-size: 9.5pt; margin: 0 0 3pt; }',
      '.context { font-size: 9.5pt; margin: 0 0 3pt; }',
      '.skill-row { margin-bottom: 3pt; }',
      '.project { margin-bottom: 7pt; page-break-inside: avoid; }',
      '.project-name { font-size: 10pt; margin: 0 0 1pt; }',
      '.project-tech { font-size: 9.5pt; margin: 0 0 1pt; }',
      'header { margin-bottom: 4pt; }',
    ].join('\n');
  }

  function buildHeader(r) {
    var contact = [
      esc(r.location),
      esc(r.phone),
      esc(r.email),
      esc(r.linkedin),
      esc(r.github),
    ]
      .filter(Boolean)
      .map(function (item) {
        return '<span>' + item + '</span>';
      })
      .join(' | ');

    return (
      '<header>' +
      '<h1>' + esc(r.name) + '</h1>' +
      '<p class="role-line"><strong>' + esc(r.title) + '</strong></p>' +
      '<p class="contact">' + contact + '</p>' +
      '</header>'
    );
  }

  function buildExperience(list) {
    return list
      .map(function (job) {
        var bullets = job.bullets
          .map(function (b) {
            return '<li>' + esc(b) + '</li>';
          })
          .join('');

        var meta = [job.company, job.location].filter(Boolean).join(' — ');

        return (
          '<div class="job">' +
          '<div class="job-head"><h3>' + esc(job.role) + '</h3></div>' +
          '<p class="job-meta"><strong>' + esc(meta) + '</strong></p>' +
          '<p class="period">' + esc(job.period) + '</p>' +
          (job.context ? '<p class="context">' + esc(job.context) + '</p>' : '') +
          '<ul>' + bullets + '</ul>' +
          '</div>'
        );
      })
      .join('');
  }

  function buildSkills(list) {
    return list
      .map(function (group) {
        return (
          '<p class="skill-row"><strong>' + esc(group.label) + ':</strong> ' +
          esc(group.items) + '</p>'
        );
      })
      .join('');
  }

  function buildProjects(list) {
    return list
      .map(function (project) {
        return (
          '<div class="project">' +
          '<p class="project-name"><strong>' + esc(project.name) + '</strong></p>' +
          '<p class="project-tech">' + esc(project.tech) + '</p>' +
          '<p>' + esc(project.description) + '</p>' +
          '</div>'
        );
      })
      .join('');
  }

  function buildDocument(r) {
    return (
      '<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8">' +
      '<title>' + esc(FILENAME) + '</title>' +
      '<style>' + styles() + '</style></head><body>' +
      buildHeader(r) +
      '<h2>Resumo Profissional</h2>' +
      '<p>' + esc(r.summary) + '</p>' +
      '<h2>Experiência Profissional</h2>' +
      buildExperience(r.experience) +
      '<h2>Habilidades Técnicas</h2>' +
      buildSkills(r.skills) +
      '<h2>Projetos</h2>' +
      buildProjects(r.projects) +
      '<h2>Idiomas</h2>' +
      '<ul>' +
      r.languages
        .map(function (l) {
          return '<li>' + esc(l) + '</li>';
        })
        .join('') +
      '</ul>' +
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
