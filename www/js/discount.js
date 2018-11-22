const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const $ = (s, ctx = document) => ctx.querySelector(s);

function updatePrices() {
  const discount = window.discount;
  if (!discount || discount.error) return;
  if ($$('#marker').length === 0) return;
  console.log('updating prices', discount);
  let selector = '.pricing-table > div';
  if (discount.package !== '*') {
    // change the selector
    selector = `.pricing-table > #pkg-${discount.package.toLowerCase()}`;
  }

  $$(selector)
    .filter(el => !el.hidden)
    .forEach(group => {
      const el = $('.price-number', group);
      const n = parseInt(el.innerHTML, 10);
      let v;
      if (discount.percent) {
        v = (n - n / (100 / discount.value)).toFixed(2);
      } else {
        v = (n - discount.value / 100).toFixed(2);
      }

      const [usd, cents] = v.toString().split('.');

      if (cents === '00') {
        v = `${usd}`;
      } else {
        v = `${usd}<span style="opacity: 0.5" class="price-decimal">.${cents}</span>`;
      }

      el.innerHTML = v;

      const desc = $('.price-description', group);
      desc.innerHTML = `<strike>Original price $${n}</strike>`;
      desc.style.display = 'block';

      const btn = $('.btn.btn-primary', group);
      btn.href += `?coupon=${discount.code}`;
      $('.buy-price', btn).innerHTML = `$${usd}`;
    });
}

if (window.location.search) {
  const input = window.location.search.substring(1);
  var out = document.getElementById('ends-in');
  const res = {};
  for (const param of input.split('&')) {
    let [key, value] = param.replace(/\+/g, ' ').split('=');
    value = value === undefined ? null : decodeURIComponent(value);
    res[key] = value;
  }

  if (res.coupon) {
    const link = document.createElement('a');
    link.className = 'flash';
    link.href = `https://training.leftlogic.com/buy/next/NEXT?coupon=${
      res.coupon
    }`;

    fetch(`https://training.leftlogic.com/api/discount/${res.coupon}/next/NEXT`)
      .then(res => res.json())
      .then(res => {
        window.discount = res;
        if (res.error) return;

        let s = '';
        if (res.percent) {
          s = `Save ${res.value}%`;
        } else {
          s = `Save $${res.value / 100}`;
        }

        s += ` with "${res.code}"`;

        let end = '';

        const now = Date.now();
        const oneMonth = 28 * 24 * 60 * 60 * 1000;

        if (res.expires && res.expires - now < oneMonth) {
          end = `in <span id="ends-in">…</span> ⏰</a></span>`;
        } else {
          end = 'soon';
        }

        link.innerHTML = `<span>${s} today — click here — ends ${end}</span>`;
        document.querySelector('#header').appendChild(link);

        updatePrices();

        const out = document.querySelector('#ends-in');
        if (out)
          setInterval(function() {
            var ends = res.expires;
            var d = new Date();
            d.setTime(ends - Date.now());

            var bits = ['h', 'm', 's'];

            out.innerHTML =
              d
                .toJSON()
                .split('T')[1]
                .slice(0, -3)
                .replace(/:/g, function(all, match, index) {
                  return '<span class="div">' + bits.shift() + '</span>';
                }) +
              '<span class="div">' +
              bits.shift() +
              '</span>';
          }, 100);
      });
  }
}
