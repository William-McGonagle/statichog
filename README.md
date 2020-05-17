# StaticHog

[NPM](https://www.npmjs.com/package/statichog) [Github](https://github.com/William-McGonagle/statichog)

StaticHog allows users to quickly generate huge static websites through template pages and cast documents.

## How to install

`npm install -g statichog`

## Current Release

The current release lets users create a JSON tree as a cast for the template. The template is a piece of HTML that contains elements with id attributes. These ID attributes will be the same as the keys in the cast JSON object.

The current release also has support for computed file. This can be used for cases where the user wants to manipulate their page information in any way they want.

## compute
*The compute command is used to quickly fill out the template page using information provided by the cast, and the Javascript on the template page. This is very similar to how PHP works, except it is using Javascript, and it returns a static webpage, so PHP ideas like session variables will not work.*

### Scripts

Scripts are used just like PHP. In the html, use `<?hog` to start out the hog code, and to end it, just type `?>`. When using scripts, replacement is not allowed. This means that you cannot use %text% in the template because it will not be replaced by anything. But, if you still want that to be changed to the cast text, just replace %text% with `<?hog output = cast.text; ?>`. The compute system allows the same exact functionality as the replace system, but with a lot more functionality. Now, you can do things like the example below.

```Javascript
<?hog

  var title = cast.blogTitle;
  var titleLength = title.length;

  output = "Blog title is ${title}, and its length is ${titleLength}.";

?>
```

Another example (below) is array manipulation done with hog script.

```Javascript
<?hog

  var a = cast.joinVar; // Variables from cast can be used

  console.log("Hey!"); // This wont return anything

  // The only way to give output is with setting the output variable
  output = new Array(60).join(a);

?>
```

Hog scripts that reference other hog scripts also work as expected. This technique is known as hog chaining. This is shown in the example below.

```Javascript
<?hog

  var hogText = "Oink";

?>
<?hog

  output = "The last hog said: " + hogText;

?>
```

## replace
*The replace command is used to quickly fill out the template page with whatever text you want. This can be very useful for filling out boilerplate webpages.*

### For the title

The title is possibly the simplest part of the replacement process. Simply put %key% in the title, and the string that is connected to this key will replace it.

**Cast**

```JSON
{
  "title": "This is my title"
}
```

**Template**

```HTML
<title>%title% - Steve</title>
```

**Result**

```HTML
<title>This is my title - Steve</title>
```

### For Direct Replacement

Direct replacement is probably the second easiest. Just set the ID of the element whose content you want replaced to whatever key you want to replace it. This can be used in many different ways, but the simplest way is shown below.

**Cast**

```JSON
{
  "name": "Mark"
}
```

**Template**

```HTML
<p>My name is <p id="name"></p></p>
```

**Result**

```HTML
<p>My name is <p id="name">Mark</p></p>
```

### For Array Replacement

Say you have the body of your blog, and you want to have h3 tags and p tags. What you would be able to do is set the ID attribute of a parent of these elements, and then use that same ID in the Cast. But, instead of using a string as the Cast body, use an array of strings. This will let you do multiple items in a very human readable way.

**Cast**

```JSON
{
  "body": [
    "<h3>Section A</h3>",
    "<p>Hey, this is section A!</p>"
  ]
}
```

**Template**

```HTML
<div id="body">

</div>
```

**Result**

```HTML
<div id="body">
  <h3>Section A</h3>
  <p>Hey, this is section A!</p>
</div>
```

## Future Releases

In future releases, simple Javascript parsing may be added so that web pages can be generated even more flexibly. This would work very similar to PHP where there would be `<?blog console.log("hey"); ?>` tags, except each 'code-block' would most-likely not have any concurrent data.

Also, bulk generation may be added so that entire static websites can be generated at once. This would possibly work in tandem with SQL databases, or CSV datasets. This would allow for a simpler processing of data, and a much smaller amount of repetition for the generation of JSON files.

## Author and License

This was created by William McGonagle and is licensed under the ISC license. If you want to edit the code for yourself, you can. But, you have to give all credits for the code that I wrote and the idea, to me.

[William's Website](https://william-mcgonagle.github.io)

[William's Github](https://github.com/William-McGonagle)

[William's Twitter](https://twitter.com/WilliamMcGona11)

[William's Facebook](https://www.facebook.com/william.mcgonagle.520/)
