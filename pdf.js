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
      '  line-height: 1.4;',
      '  color: #000;',
      '  background: #fff;',
      '}',
      'h1 { font-size: 20pt; line-height: 1.15; margin: 0 0 3pt; }',
      'h2 {',
      '  font-size: 11pt;',
      '  text-transform: uppercase;',
      '  letter-spacing: 0.6pt;',
      '  margin: 12pt 0 5pt;',
      '  padding-bottom: 2pt;',
      '  border-bottom: 1pt solid #000;',
      '  page-break-after: avoid;',
      '}',
      'h3 { font-size: 10.5pt; margin: 0; }',
      'p { margin: 0 0 4pt; }',
      'a { color: inherit; text-decoration: none; }',
      'ul { margin: 3pt 0 0; padding-left: 14pt; }',
      'li { margin-bottom: 2pt; }',
      'header { margin-bottom: 2pt; }',
      '.role-line { font-size: 10.5pt; margin: 0 0 2pt; }',
      '.contact { font-size: 9.5pt; margin: 0; }',
      '.contact span { white-space: nowrap; }',
      '.job { margin-bottom: 9pt; page-break-inside: avoid; }',
      '.job-meta { font-size: 9.5pt; margin: 1pt 0 2pt; }',
      '.context { font-size: 9.5pt; font-style: italic; margin: 0 0 2pt; }',
      '.skill-row { margin-bottom: 2pt; }',
      '.entry { margin-bottom: 5pt; }',
    ].join('\n');
  }

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
      .join(' | ');

    return (
      '<header>' +
      '<h1>' + esc(r.name) + '</h1>' +
      '<p class="role-line"><strong>' + esc(r.title) + '</strong></p>' +
      '<p class="contact">' + contact + '</p>' +
      '</header>'
    );
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

  function buildExperience(list) {
    return list
      .map(function (job) {
        var bullets = job.bullets
          .map(function (b) {
            return '<li>' + esc(b) + '</li>';
          })
          .join('');

        var meta = [job.company, job.location, job.period].filter(Boolean).join(' | ');

        return (
          '<div class="job">' +
          '<h3>' + esc(job.role) + '</h3>' +
          '<p class="job-meta">' + esc(meta) + '</p>' +
          (job.context ? '<p class="context">' + esc(job.context) + '</p>' : '') +
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
      section('Resumo Profissional', '<p>' + esc(r.summary) + '</p>') +
      section('Habilidades Técnicas', buildSkills(r.skills)) +
      section('Experiência Profissional', buildExperience(r.experience)) +
      (education.length ? section('Formação Acadêmica', buildEducation(education)) : '') +
      (certifications.length ? section('Certificações', buildCertifications(certifications)) : '') +
      section('Idiomas', '<p>' + r.languages.map(esc).join(' | ') + '</p>') +
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
