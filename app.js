const posts = {
	documentID: 'your_document_ID_here',
	index: function(){
		document.getElementById('quotes').innerHTML='<div class="container"><h2>Blog Posts</h2><div class="row" id="blog-posts"></div></div>';
		database.index(quotes.documentID,function(items){
			document.getElementById('blog-posts').innerHTML='';
			for(let i=0;i<items.length;i++){
				let post=items[i];
				let el=document.createElement('div');
				el.innerHTML=`<div class="col-md-4">
						<div class="card mb-4 shadow-sm">
							<div class="card-body">
								<h3>${post.title}</h3>
								<p class="card-text">${post.content.substring(0, 100)}...</p>
								<div class="d-flex justify-content-between align-items-center">
									<div class="btn-group">
										<a href="detail.html?index=${i}" class="btn btn-sm btn-outline-secondary">View</a>
									</div>
									<small class="text-muted">${new Date(post.date).toLocaleDateString()}</small>
								</div>
							</div>
						</div>
					</div>`;
				document.getElementById('blog-posts').append(el);
				console.log('Items:', items);

			}
		});
	},
	
	detail: function(index) {
	  database.detail(posts.documentID, index, function(item) {
		document.getElementById('loading').style.display = 'none';
		document.getElementById('post-title').innerText = item.title;
		document.getElementById('post-body').innerText = item.body;
		document.getElementById('post-author').innerText = item.author;
		document.getElementById('btn-edit').setAttribute('href', `edit.html?index=${index}`);
		
		let deleteButton = document.getElementById('btn-delete');
		deleteButton.addEventListener('click', function() {
		  database.delete(posts.documentID, index);
		});
	  });
	},
	create: function() {
	  document.querySelector('form').addEventListener('submit', function(e) {
		e.preventDefault();
		let author = document.querySelector('form input[name=author]');
		let title = document.querySelector('form input[name=title]');
		let body = document.querySelector('form textarea[name=body]');
		let newPost = {
		  author: author.value,
		  title: title.value,
		  body: body.value
		};
		database.create(posts.documentID, newPost);
	  });
	},
	update: function(index) {
	  database.detail(posts.documentID, index, function(item) {
		document.getElementById('loading').style.display = 'none';
		document.querySelector('form input[name=author]').value = item.author;
		document.querySelector('form input[name=title]').value = item.title;
		document.querySelector('form textarea[name=body]').value = item.body;
		
		document.querySelector('form').addEventListener('submit', function(e) {
		  e.preventDefault();
		  let author = document.querySelector('form input[name=author]');
		  let title = document.querySelector('form input[name=title]');
		  let body = document.querySelector('form textarea[name=body]');
		  let newPost = {
			author: author.value,
			title: title.value,
			body: body.value
		  };
		  database.update(posts.documentID, index, newPost);
		});
	  });
	}
  }
  console.log('App loaded');
