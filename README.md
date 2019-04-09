# event-randomizer
Produces a buffer of Int32 based on events firing in the browser window.

#### Usage
Load bundle into browser ```<script src="**somepath**/dist/event-randomizer.min.js"></script> ```

#### Example Usage
```
<script src="**somepath**/dist/event-randomizer.min.js"></script>
<script>
  EventRandomizer.start(); // default buffer output size is 128
  EventRandomizer.getValue();
  EventRandomizer.stop();
</script>
```

#### Documentation

**Start** ```EventRandomizer.start()```

Optional Parameter: *Number* - Default: *128*
Attaches event listeners and allows the firing of *onUpdate* event.

**Stop** ```EventRandomizer.stop()```

Cleans up all listeners and stops the firing of *onUpdate* event.

**onUpdate** ```EventRandomizer.onUpdate = (buffer) => {} ```

Attach a function to fire on every window event.

**getValue** ```EventRandomizer.getValue()```

Returns Int32Array.

**clear** ```EventRandomizer.clear()```

Resets internal buffers.
