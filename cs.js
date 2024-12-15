if(typeof window.rr_get_contacts == "undefined"){
    window.rr_get_contacts = true;

    const _tag = e => { return document.getElementsByTagName(e) }
    const _id = e => { return document.getElementById(e) }
    const _cre = e => { return document.createElement(e) }
    const _cll = e => { return document.getElementsByClassName(e) }

    let _rgc_gp = () => {
        let a = {};
        if(location.search){
            let b = location.search.split('?')[1];
            if(b){
                let c = b.split('&');
                for(let d in c){
                    let e = c[d].split('=');
                    if(e.length>1){
                        a[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
                    }
                }
            }
        }
        return a;
    }

    let _rgc_buff = false,_rgc_buff_2=false,_rgc_buff_3=false;

    const _rgc_continue = () => {
        clearInterval(_rgc_buff);
        clearInterval(_rgc_buff_2);

        if(!localStorage.getItem('_rgc') || localStorage.getItem('_rgc') != 'run'){
            console.log('_rgc disabled');
            _id('_rgc_start').disabled = false;
            return false;
        }
        _id('_rgc_start').disabled = true;

        new Promise((rs,rj)=>{
            _rgc_buff = setInterval(()=>{
                console.log('runenr 1');
                let svl = false;
                let base = document.getElementsByTagName('rr-unified-search-results')[0];
                let rcs = document.getElementsByTagName('rr-unified-search-results')[0].getElementsByTagName('svelte-component');
                for(let i=0;i<rcs.length;i++){
                    if(rcs[i].getAttribute('type') == 'ResultsCheckboxSelector'){
                        svl = rcs[i];
                        break;
                    }
                }
                if(svl){
                    clearInterval(_rgc_buff);
                    rs(svl);
                }
            },1000);
        }).then(svl=>{
            window.scrollTo(0, document.body.scrollHeight);
            let cb = svl.shadowRoot.querySelector('input');
            if(!cb){
                rr_buff = setTimeout(_rgc_continue,1000);
                return;
            }
            if(cb&&!cb.checked){
                cb.click();
                new Promise((rs,rj)=>{
                    _rgc_buff_2 = setInterval(()=>{
                        console.log('runner 2');
                        let a = svl.parentNode.getElementsByTagName('svelte-component');
                        for(let i in a){
                            let b = a[i];
                            if(b.getAttribute('type')&&b.getAttribute('type')=='GetSelectedButton'){
                                rs(b);
                                clearInterval(_rgc_buff_2);
                                break;
                            }
                        }
                    },1000);
                }).then(b=>{
                    let c = b.shadowRoot.querySelector('button');
                    if(!c.disabled){
                        c.click();
                        new Promise((rs,rj)=>{
                             _rgc_buff_3 = setInterval(()=>{
                                console.log('runner 3');
                                let d = _cll('modal-header');
                                for(let i in d){
                                    let e = d[i].innerText;
                                    if(e&&e.indexOf('Get Contact Info for Selected Contacts') > -1){
                                        rs(d[i]);
                                        clearInterval(_rgc_buff_3);
                                        break;
                                    }
                                }
                            },1000);
                        }).then(f=>{
                            let g = f.parentNode.getElementsByTagName('button');
                            let cons_me = false;
                            for(let i in g){
                                let h = g[i];
                                if(h.getAttribute&&h.getAttribute('ng-click')&&h.getAttribute('ng-click')=='ok();'){
                                    h.click();
                                    cons_me = true;
                                    break;
                                }
                            }
                            if(cons_me){
                                setTimeout(()=>{
                                    location.reload();
                                },3000);
                            }
                        })
                    }
                })
                
            }
        })
    }

    let gbb = _cre('div'),gb=_cre('button'),gl_dl=_cre('button');
    gbb.appendChild(gb);
    gb.innerHTML = 'Get Contacts';
    gb.setAttribute('data-old',gb.innerText);
    gbb.setAttribute('style','position: fixed;bottom: 0px;display: flex;justify-content: center;align-items: center;width: 100%;padding-bottom:20px;');
    gb.setAttribute('style','margin-right:10px;');
    gb.id = '_rgc_start';
    gb.disabled = true;
    gb.addEventListener('click',()=>{
        localStorage.setItem('_rgc','run');
        location.reload();
    });

    gl_dl.id = '_rgc_stop_b';
    gl_dl.innerHTML = 'Stop';
    gl_dl.addEventListener('click',()=>{
        localStorage.setItem('_rgc','no');
        alert('Stopped');
    });
    gbb.appendChild(gl_dl);

    document.body.appendChild(gbb);
    _rgc_continue();
}