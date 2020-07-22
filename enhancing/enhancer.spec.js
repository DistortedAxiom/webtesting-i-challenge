const enhancer = require('./enhancer.js');
const { repair, success, fail } = require('./enhancer.js');

let item = {
    name: 'axe',
    durability: 50,
    enhancement: 1
}

let item2 = {
    name: 'axe',
    durability: 50,
    enhancement: 15
}

let item3 = {
    name: 'axe',
    durability: 50,
    enhancement: 17
}


let maxEnhancementItem = {
    name: 'sword',
    durability: 50,
    enhancement: 20
}

let over20 = {
    name: 'staff',
    durability: 100,
    enhancement: 21,
}

describe("repair()", function() {
    it('Durability should be restored to 100', function() {
        repair(item);
        expect(item.durability).toEqual(100);
    })
})

describe("success()", function() {
    it('Enhancement should be increased by 1', function() {
        oldEnhancement = item.enhancement
        success(item);
        expect(item.enhancement).toBe(oldEnhancement + 1)
    })

    it('Enhancement should not increase if already is 20', function() {
        success(maxEnhancementItem);
        expect(maxEnhancementItem.enhancement).toBe(20)
    })

    it('Enhancement cannot be over 20', function() {
        expect(success(over20)).toBe("Invalid Item")
    })
})

describe("fail()", function() {
    it('Durability of item with less than 15 enhancement should be decreased by 5', function() {
        oldDurability = item.durability
        fail(item)
        expect(item.durability).toBe(oldDurability - 5)
    })
    it('Durability of item with more or equal 15 enhancement should be decreased by 10', function() {
        oldDurability = item2.durability
        fail(item2)
        expect(item2.durability).toBe(oldDurability - 10)
    })
    it('Durability of item with more than 16 should be decreased by 10 and enhacement reduced by 1', function() {
        oldDurability = item3.durability
        oldEnhancement = item3.enhancement
        fail(item3)
        expect(item3.durability).toBe(oldDurability - 10);
        expect(item3.enhancement).toBe(oldEnhancement - 1)
    })
})
