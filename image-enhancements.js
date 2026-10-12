const originalPhotos = {
  '.art-grills': ['balconyinvisiblegrills.png', 'Balcony invisible grill installation'],
  '.art-nets': ['balconysafetynets.png', 'Balcony safety net installation'],
  '.art-birds': ['pigeonsafetynets.png', 'Pigeon protection net installation'],
  '.project-one .project-image': ['balconygrills.png', 'Invisible grills for balcony living'],
  '.project-two .project-image': ['childrensafetynets.png', 'Children safety nets'],
  '.project-three .project-image': ['antibirdnets.png', 'Anti bird netting']
};
Object.entries(originalPhotos).forEach(([selector, [file, description]]) => {
  const container = document.querySelector(selector);
  container.removeAttribute('aria-hidden');
  container.replaceChildren();
  const image = document.createElement('img');
  image.src = `assets/${file}`;
  image.alt = description;
  image.loading = 'lazy';
  container.append(image);
});
document.querySelector('.hero-backdrop').replaceChildren();
document.querySelector('.brand--footer').innerHTML = '<img class="brand-logo" src="jayram-enterprises-logo.png" alt="Jayram Enterprises — Safety Nets & Invisible Grills" width="280" height="105">';
const galleryPhotos = [['balonynets','Balcony safety net'],['balconynets1','Balcony netting'],['pigeonnets1','Pigeon netting'],['antibird','Anti bird netting'],['childrennets','Children safety net'],['cricketnets','Cricket practice net'],['balconygrills','Balcony invisible grill'],['windowgrills','Window invisible grill'],['stainlesssteelgrills','Stainless steel invisible grill']];
const gallery = document.createElement('section');
gallery.className = 'section shell installation-gallery';
gallery.innerHTML = '<p class="eyebrow dark">FROM THE ORIGINAL WEBSITE</p><h2>Installation <i>gallery.</i></h2><div class="installation-photos">' + galleryPhotos.map(([file,label]) => `<figure><a href="assets/${file}.png" target="_blank" rel="noopener"><img src="assets/${file}.png" alt="${label}" loading="lazy" width="400" height="300"></a><figcaption>${label}</figcaption></figure>`).join('') + '</div>';
document.querySelector('#projects').after(gallery);
