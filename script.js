document.addEventListener('DOMContentLoaded', () => {
    Fancybox.bind('[data-fancybox]');  
    const inputName = document.getElementById('name');
    const form = document.querySelector('form');
    const modalBlock = document.querySelector('.modal_background');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        modalBlock.style.setProperty('display', 'flex');
        document.body.style.setProperty('overflow-y', 'hidden');

        const formData = Array.of(...event.target.children)
            .filter(item => item.tagName === 'INPUT')
            .reduce((acc, curr) => {
                return ({ ...acc, [curr.placeholder]: curr.value })
            }, {})

        await new Promise((resolve) => resolve(setTimeout(() => {
            fetch('test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(formData)
            });

            modalBlock.style.setProperty('display', 'none');
            document.body.style.setProperty('overflow-y', 'auto');
        }, 2000)))
    })


    inputName.addEventListener('input', ({ data }) => {
        if (data === '.') {
            inputName.value = inputName.value.replace('.', '');
        }
    })

    inputName.addEventListener('change', ({ target }) => {
        inputName.value = target.value.replaceAll('.', '');
    })

    Fancybox.defaults = {
        ...Fancybox.defaults,
        Images: {
            initialSize: "fit",
          },
      };
})