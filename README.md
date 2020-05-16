# StaticHog

[NPM](https://william-mcgonagle.github.io) [Github](https://william-mcgonagle.github.io)

StaticHog allows users to quickly generate huge static websites through template pages and cast documents.

## How to install

`npm install -g statichog`

## Current Release

The current release lets users create a JSON tree as a cast for the template. The template is a piece of HTML that contains elements with id attributes. These ID attributes will be the same as the keys in the cast JSON object.

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
